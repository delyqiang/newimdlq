<template>
  <div class="vue-uploader" >
    <div class="file-list" v-show="previewDisplay">
      <section v-for="(file, index) in files" class="file-item draggable-item" :key="index">
        <a :href="file" target="_blank"> <img :src="file" alt="" ondragstart="return false;"></a>
        <span class="file-remove" @click="remove(index)"  v-if="!titleSrc">+</span>
      </section>
      <section v-if="status === 'ready'&&files.length<fileCount" class="file-item">
        <div @click="add" v-if="!titleSrc">
          <div class="ivu-upload-drag" style="width: 100px;height:100px;line-height: 110px;box-sizing: border-box">
            <Icon type="plus-round" size="40"></Icon>
            <input type="file" @change="fileChanged" ref="file" multiple="multiple" :accept="accept" class="ivu-upload-input">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
  import {writetoken} from '../api/index'
  export default {
    props:{
      files:{
        type:Array
      },//图片数组
      titleSrc:{
        type:Boolean
      },//是否可新增/删除
      accept:{
        type:String,
        default: 'image/png,image/jpeg,image/jpg'
      },//格式
      fileCount: {
        type: [String,Number],
        required: false,
        default: 1
      },//上传数量
      timestampName: {
        type: Boolean,
        required: false,
        default: false
      },//是否使用时间戳名称
      previewDisplay: {
        type: Boolean,
        required: false,
        default: false
      },//是否展示预览列表
    },
    data() {
      return {
        status: 'ready',
        // files: [],
        uplist:[],
        point: {},
        uploading: false,
        percent: 0,
        accessKeyId:'',
        bucket:'',
        endpoint:'',
        accessKeySecret:'',
        securityToken:''
      }
    },
    methods: {
      //点击新增
      add() {
        this.$refs.file.value = '';
        this.$refs.file.click();
        this.lokkssoss()
      },
      //初始化获取后台oss签名
      lokkssoss(){
        let that = this;
        let params={};
        writetoken(params).then((res)=>{
          if (res.status===200) {
           let result = res.data.result;
            that.accessKeyId=result.credentials.accessKeyId;
            that.bucket=result.bucket;
            that.endpoint=result.endpoint;
            that.accessKeySecret=result.credentials.accessKeySecret;
            that.securityToken=result.credentials.securityToken;

          }
        })
      },
      //上传oss
      submit() {
        // console.log('要上传到oss的本地图片',this.uplist);
        let that=this;
        //  这里是OSS
        that.client = new OSS.Wrapper({
          secure: true,
          region: 'oss-cn-beijing',
          accessKeyId:that.accessKeyId,
          accessKeySecret: that.accessKeySecret,
          stsToken:that.securityToken,
          bucket:that.bucket,
          cname:true,
          endpoint:'https://'+that.endpoint
        });
        // console.log("OSS",that.client);
        const fNum = this.uplist;
        // console.log('批次',fNum);
        for(let i=0;i<fNum.length;i++){
          let f=fNum[i].file;
          let reader = new FileReader();
          reader.readAsArrayBuffer(f);
          const Name=f.name;
          const suffix = Name.substr(Name.indexOf("."));
          const obj=this.timestamp();
          let storeAs;
          if (this.timestampName){//是否使用时间戳名称
            storeAs = 'salary/'+obj+i+'/'+obj+suffix ;// 路径+时间戳+后缀名
          }
          else{
            storeAs = 'salary/'+obj+i+'/'+Name ;// 路径+上传文件名称
          }
          // const storeAs = 'salary/'+obj+'/'+obj+suffix ;// 路径+时间戳+后缀名
          // storeAs = 'salary/'+obj+i+'/'+Name ;// 路径+上传文件名称
          reader.onload = (e) => {
            const lis = e.target.result;
            let asd = new Buffer(lis) ;
            // 做ie10兼容--没成功
            // var asd = new Buffer(lis.byteLength);
            // var view = new Uint8Array(lis);
            // for (var i = 0; i < asd.length; ++i) {
            //   asd[i] = view[i];
            // }
            that.muoload(storeAs, asd ,i);

            // that.client.multipartUpload(storeAs, f).then(function(res){
            //   console.log(storeAs, asd ,i)
            // })
          }
        }
      },
      //异步
      muoload(storeAs, f,i){
        let that = this;
        that.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'load-c',
                  size: 30
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
        that.client.put(storeAs, f).then(function(res){
          // console.log(res.url,'res560'+i);
          that.$Spin.hide();
          that.files.push(res.url);
          that.$set(that.uplist[i],'url',res.url)
          that.listResult();
        }).catch(e=>{
          that.$Spin.hide();
        })
      },
      // 时间戳
      timestamp:function(){
        const time = new Date();
        const y = time.getFullYear();
        const m = time.getMonth()+1;
        const d = time.getDate();
        const h = time.getHours();
        const mm = time.getMinutes();
        const s = time.getSeconds();
        const ms = time.getMilliseconds();
        return ""+y+this.Add0(m)+this.Add0(d)+this.Add0(h)+this.Add0(mm)+this.Add0(s)+this.Add0(ms);
      },
      //处理日期
      Add0:function(m){
        return m<10?'0'+m : m;
      } ,
      //删除
      remove(index) {
        this.files.splice(index, 1);
        this.listResult();
      },
      //本地上传change事件
      fileChanged() {
        const list = this.$refs.file.files;
        if (list.length>0){
          if (list.length>this.fileCount*1) {
            this.$Message.warning('图片上传数量超限!');
            return
          }
          this.uplist = [];
          for (let i = 0; i < list.length; i++) {
            if (!this.typeJy(list[i]).status) {
              this.$Message.warning(`上传格式仅支持${this.typeJy(list[i]).type.toString()}`);
              return
            }
            // if (!this.isContain(list[i])) {
            const item = {
              name: list[i].name,
              size: list[i].size,
              file: list[i]
            };
            this.html5Reader(list[i], item);
            this.uplist.push(item);
            // }
          }
          this.$refs.file.value = '';
          this.submit();
        }

      },
      //格式判断
      typeJy(file){
        const imgFileType = this.accept.split(',');
        let type = [];
        for(let i=0;i<imgFileType.length;i++){
          let HZHUI = imgFileType[i].match('[^\/||\.]+(?!.*/)')[0]
          type.push(HZHUI)
        }
        const filetype = file.name
        const suffix = filetype.substring(filetype.lastIndexOf('.')+1)
        if(!type.some(i=>i==suffix)){
          return {
            status:false,
            type:type,
          }
        }else{
          return {
            status:true,
            type:type,
          }
        }
      },
      // 将图片文件转成BASE64格式
      html5Reader(file, item){
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$set(item, 'src', e.target.result)
        };
        reader.readAsDataURL(file);
      },
      //判断是否上传过--废
      isContain(file) {
        return this.files.find((item) => item.name === file.name && item.size === file.size);
      },
      //给父组件返回数组
      listResult(){
        this.$emit("listResult",this.uplist)
      }

    },
  created() {
  },
    mounted(){
      this.lokkssoss()
    }
  }
</script>
<style>
  .vue-uploader {
    /*border: 1px solid #e5e5e5;*/
    display: inline-block;
  }
  .vue-uploader .file-list {
    padding: 10px 0;
  }
  .vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
  }
  .vue-uploader .file-list .file-item {
    float: left;
    margin-left: 10px;

    position: relative;
    width: 100px;
    text-align: center;
  }
  .vue-uploader .file-list .file-item img{
    width: 100px;
    height: 100px;
    border: 1px solid #ececec;
  }
  .vue-uploader .file-list .file-item img:hover{
    cursor: pointer;
  }
  .vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right: 4px;
    display: none;
    top: 4px;
    width: 20px;
    height: 20px;
    font-size:20px;
    text-align: center;
    color: white;
    cursor: pointer;
    line-height: 20px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
  }
  .vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
  }
  /*.vue-uploader .file-list .file-item {*/
    /*!*margin: 0;*!*/
    /*!*height: 40px;*!*/
    /*word-break: break-all;*/
    /*font-size: 14px;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 2;*/
    /*-webkit-box-orient: vertical;*/
  /*}*/
  /*.vue-uploader {*/
    /*width: 100px;*/
    /*height: 100px;*/
    /*float: left;*/
    /*text-align: center;*/
    /*line-height: 100px;*/
    /*font-size: 30px;*/
    /*cursor: pointer;*/
    /*border: 1px solid #ccc;*/
  /*}*/

  .vue-uploader > input[type="file"] {
    display: none;
  }
</style>
