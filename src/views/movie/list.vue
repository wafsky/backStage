<template>
  <div class="app-container">
    <el-button type="primary" @click="create">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column property="title" label="电影名称" />
      <el-table-column property="stars" label="演员" />
      <el-table-column property="score" label="评分" />
      <el-table-column property="desc" label="描述" />
      <el-table-column property="p.name" label="城市" />

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" alt="" style="height: 80px">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row._id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 40%; margin: 10px auto">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        @current-change="changePage"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CityList',
  components: {},

  data() {
    return {
      pageSize: 4,
      currentPage: 1,
      total: 0,
      tableData: [],
      currentRow: null
    }
  },
  created() {
    this.getMovieList()
  },
  methods: {
    getMovieList() {
      axios
        .get(`/movies?page=${this.currentPage}&pageSize=${this.pageSize}`)
        .then((res) => {
          this.tableData = res.data.list
          this.total = res.data.total
        })
    },

    create() {
      this.$router.push({
        path: '/movie/create'
      })
    },

    handleEdit(id) {
      // console.log(id);
      this.$router.push({
        path: '/movie/edit/' + id
      })
    },

    handleDelete(id) {
      // console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios.delete('/delmovie/' + id).then((res) => {
            // console.log(res);
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.currentPage = 1
            this.getMovieList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    changePage(page) {
      this.currentPage = page
      this.getMovieList()
    }
  }
}
</script>

<style scoped>
</style>
