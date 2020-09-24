<template>
  <div class="app-container">
    <el-button type="primary" @click="create">添加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="100" />
      <el-table-column property="name" label="姓名" width="200" />
      <el-table-column property="index" label="索引" width="200" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>

      <el-col :span="8" style="margin: 10px auto">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page="currentPage"
          :total="total"
          @current-change="changePage"
        />
      </el-col>

    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CityList',
  components: {},

  data() {
    return {
      pageSize: 3,
      currentPage: 1,
      total: 0,
      tableData: [],
      currentRow: null
    }
  },
  created() {
    this.getCityList()
  },
  methods: {
    getCityList() {
      axios
        .get(`/citys?page=${this.currentPage}&pageSize=${this.pageSize}`)
        .then((res) => {
          this.tableData = res.data.list
          this.total = res.data.total
        })
    },

    create() {
      this.$router.push({
        path: '/city/create'
      })
    },

    handleEdit(id) {
      this.$router.push({
        path: '/city/edit/' + id
      })
    },

    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios.delete('/delcity/' + id).then((res) => {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getCityList()
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
      this.getCityList()
    }
  }
}
</script>

<style scoped>
</style>
