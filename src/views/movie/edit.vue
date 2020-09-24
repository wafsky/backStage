<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          action="app"
          :show-file-list="false"
          :http-request="UploadImage"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form ref="form" label-width="80px">
          <el-form-item label="电影名称">
            <el-input v-model="movie.title" />
          </el-form-item>
          <el-form-item label="演员">
            <el-input v-model="movie.stars" />
          </el-form-item>

          <el-form-item label="选择城市" prop="region">
            <el-select v-model="movie.p" placeholder="请选择城市">
              <el-option
                v-for="item in list"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="评分">
            <el-input v-model="movie.score" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="movie.desc" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button @click="cancal">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditMovie',
  components: {},
  data() {
    return {
      movie: {
        title: '',
        stars: '',
        imgUrl: '',
        p: '',
        score: '',
        desc: '',
        _id: ''
      },
      list: [],
      imageUrl: ''
    }
  },
  created() {
    this.getCityList()
    var id = this.$route.params.id
    this.movie._id = this.$route.params.id
    this.getMovie(id)
  },
  methods: {
    getCityList() {
      axios.get('/cityss').then((res) => {
        // console.log(res.data.list);
        this.list = res.data.list
        // console.log(this.list)
      })
    },

    getMovie(id) {
      axios.get('/movie/' + id).then((res) => {
        this.movie = res.data.data
        this.imageUrl = this.movie.imgUrl
      })
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    UploadImage(params) {
      // console.log(params);
      const uploadData = new FormData()
      uploadData.append('avatar', params.file)
      axios.post('/upload', uploadData).then((res) => {
        this.imageUrl = res.data.path
      })
    },
    // 修改
    onSubmit() {
      if (this.movie.title) {
        this.movie.imgUrl = this.imageUrl
        axios.put('/movieEdit', this.movie).then((res) => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.cancal()
          this.$router.push({
            path: '/movie/list'
          })
        })
      }
    },
    cancal() {
      this.getMovie(this.movie._id)
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
