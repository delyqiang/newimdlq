<template>
  <div>
    <div class="image-wrapper">
      <!--<div  class="img-wrapper">-->
        <!--<div class="item" v-for="(item, index) in imgList"><img :src="item" class="dis-image"><span class="delete" @click="deleteImg(index)">X</span></div>-->
        <!--<div class="item upload-icon" @click="fileClick" v-if="imgList.length < fileCount">-->
          <!--<span class="heng"></span>-->
          <!--<span class="su"></span>-->
        <!--</div>-->
      <!--</div>-->
      <!--上传图片/文件-->
      <!--<input type="file" name="file" @change='selectFile' ref="file" multiple="multiple"/>-->
      <div>
        <input type="file" @change="selectFile" ref="file" multiple="multiple" :accept="fileType" style="display: none">
      </div>
      <div v-if="revealOpen&&list.length>0">
        <div>
          <div class="list_Name" style="color: #000;"><span>名称</span> <span>上传进度</span></div>
          <div class="ovsAuto">
            <div class="list_Name " v-for="item in list" :class="item.status==1?'colorgreen':item.status==2?'colorred':''">
              <span>{{item.name}}</span>
              <span>{{item.fogo?item.fogo:'0'}} %</span>
            </div>
          </div>
          <div>
            <div class="ds_inline mb10">
              <span class="lable_sing w50">上传中 : </span>
              {{list.length-uplist.length-falseList.length}}条
            </div>
            <div class="ds_inline mb10 colorgreen">
              <span class="lable_sing w70">成功 : </span>
              {{uplist.length}}条
            </div>
            <div class="ds_inline mb10 colorred">
              <span class="lable_sing w70">失败 : </span>
              {{falseList.length}}条
            </div>
          </div>
        </div>
      </div>
      <Modal
        v-model="modal1"
        title="上传进度"
        :mask-closable='false'
        @on-cancel="cancel"
        >
        <div style="margin:5px 20px;">
          <div class="list_Name mb10" style="color: #000;"><span>图片名称</span> <span>上传进度</span></div>
          <div class="ovs">
            <div class="list_Name" v-for="item in list">
              <span>{{item.name}}</span>
              <span>{{item.fogo?item.fogo:'0'}} %</span>
            </div>
          </div>
        </div>
        <div slot="footer">
          <Button type="text" size="large"@click="cancel">取消</Button>
          <Button type="primary" size="large"  @click="modal1=false,listResult()">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import {writetoken} from '../api/index'
  export default {
    components: {
    },
    name: 'imgUpload',
    props: {
      fileMaxSize: {
        type: [String,Number],
        required: false,
        default: 200
      },
      fileCount: {//上传数量
        type: [String,Number],
        required: false,
        default: 1
      },
      fileType: {//上传类型
        type: String,
        required: false,
        default: 'image/png,image/jpeg,image/jpg'
      },
      revealOpen: {//是否展示成功与失败列表
        type: Boolean,
        required: false,
        default: false
      },
      schedule: {//是否展示进度条列表
        type: Boolean,
        required: false,
        default: true
      }
    },
    data () {
      return {
        // 附件上传路径
        uploadHost: '',
        // 附件上传携带参数
        uploadData: {},
        // 上传后返回的存储的文件名
        fileName: '',
        // 上传后返回的文件存储地址
        filePath: '',
        imgList: [],
        showError: false,
        errorMsg: '',
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
        securityToken:'',
        client:null,
        modal1:false,
        list:[],//
        uplist:[],
        falseList:[],//失败列表
      };
    },
    mounted () {
      this.initConfig() // 调用后台接口获取阿里云上传下载通行证
    },
    methods: {
      //点击新增
      add() {
        this.$refs.file.value = "";
        this.$refs.file.click();
        this.initConfig();
      },
      //模态取消
      cancel(){
        this.$refs.file.value = '';
        this.modal1=false;
        this.list= [];//
        this.uplist=[];
        this.falseList=[];//失败列表
      },
      initConfig () {
        // 初始化oss权限
        let url = 'document.getAccess'
        let params = {
        }
        writetoken(params).then((res) => {
          if (res.status === 200) {
            let result = res.data.result;
            /* global OSS */ // 去掉esllint对OSS的校验
            this.client = new OSS.Wrapper({
              region: 'oss-cn-beijing',
              accessKeyId: result.credentials.accessKeyId,
              accessKeySecret: result.credentials.accessKeySecret,
              stsToken: result.credentials.securityToken,
              bucket:result.bucket,
              secure: true,
              cname:true,
              endpoint:'https://'+result.endpoint
            })

          }
        })
      },
      selectFile (e) {
        if (e.target.files.length>this.fileCount*1){
          this.$Message.warning(`超出规定最大上传数量${this.fileCount*1}`);
          return
        }
        this.list = e.target.files;
        this.uplist = [];
        if (this.schedule&&this.fileCount*1>1){
          this.modal1 = true;
        }
        //判断格式类型是否支持
        for (let i = 0; i <  this.list.length; i++) {
          let item =  this.list[i];
          if (!this.typeJy( item).status) {
            this.$Message.warning(`上传格式仅支持${this.typeJy( item).type.toString()}`);
            return
          }
        }
        // 选择文件
        for (let i = 0; i <  this.list.length; i++) {
          let item =  this.list[i];
          if (!this.typeJy( item).status) {
            this.$Message.warning(`上传格式仅支持${this.typeJy( item).type.toString()}`);
            this.add();
            return
          }
          this.pushFile( item,i)
        }
      },
      pushFile (file,i) {
        let that = this
        // return
        let _file = file;
        // var storeAs = '' // 传到oss上的名字
        const Name=_file.name;
        const obj=this.timestamp();
        const storeAs = 'salary/'+obj+i+'/'+Name ;// 路径+上传文件名称
        // 调用上传方法
        that.client.multipartUpload(storeAs, _file, {
          parallel: 4,
          partSize: 1024 * 1024,
          progress: function* (percentage) {
            let fileloadingNum = Math.ceil(percentage * 100)
            if (fileloadingNum<100){
              that.$set(_file,'status',0)
              // console.log('进度',that.list[z].status)
            }else if (fileloadingNum==100){
              that.$set(_file,'status',1)
            }
            that.$set(_file,'fogo',fileloadingNum)
            console.log(_file);
            // for (let z = 0 ; z<that.list.length;z++){
            //   if (that.list[z].name==Name) {
            //     if (fileloadingNum<100){
            //       that.$set(that.list[z],'status',0)
            //       // console.log('进度',that.list[z].status)
            //     }
            //     that.$set(that.list[z],'fogo',fileloadingNum)
            //   }
            // }
            that.$forceUpdate();
          }
        }).then(function (result) {
          // console.log(result);
          let boj = {
            name:result.name,
            url: result.url?result.url:result.res.requestUrls.toString().substr(0,result.res.requestUrls[0].indexOf("?uploadId")),
            certId:  Name.substr(0,Name.indexOf(".")),
            businessLicense : result.url?result.url:result.res.requestUrls.toString().substr(0,result.res.requestUrls[0].indexOf("?uploadId")),
          }
          // let listName = result.name.split('/')[2]
          // for (let z = 0 ; z<that.list.length;z++){
          //   if (that.list[z].name==listName) {
          //     that.$set(that.list[z],'status',1)
          //     that.$forceUpdate();
          //     // console.log(result,that.list[z],listName);
          //   }
          // }
          if (!that.uplist.some(i=>i.name==obj.name)){
            that.uplist.push(boj);
          }
          that.statusList();
          if (that.fileCount*1==1) {
            that.listResult()
          }
          that.$forceUpdate();
        }).catch(function (err) {
          that.$set(_file,'status',2)
          that.falseList.push(_file)
          that.$forceUpdate();
          that.statusList()
          if (that.fileCount*1==1){
            that.listResult();
          }
        })
      },
      //重新上传 在父组件中调用
      MentionAgain(){
        let that = this;
        this.initConfig();
        // const falseList = that.falseList;
        const falseList = JSON.parse(JSON.stringify(that.falseList));
        if (falseList.length<1){
          return
        }
        for (let i = 0; i < falseList.length; i++) {
          that.pushFile(falseList[i],i)
        }
        that.falseList = []
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
      //判断格式
      typeJy(file){
        const imgFileType = this.fileType.split(',');
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
      //给父组件返回数组
      listResult(){
        this.$emit("listResult",this.uplist,this.falseList,this.list)
      },
      //返回状态数组
      statusList(){
        this.$emit("statusList",this.uplist,this.falseList,this.list)
      }
    }
  };
</script>
<style scoped>
  .list_Name{
    width: 100%;
    text-align: left;
  }
  .list_Name>span:first-child{
    display: inline-block;
    width: 80%;
    word-wrap:break-word
  }
  .ovs{
    max-height: 500px;
    overflow:auto
  }
  .ovsAuto{
    max-height: 170px;
    overflow:auto
  }
</style>
