<template>
  <div>
    <div>
      <el-date-picker
        align="right"
        type="datetime"
        format="yyyy-MM-dd hh:mm:ss"
        value-format="yyyy-MM-dd hh:mm:ss"
        v-model="filterInput"
        placeholder="请选择">
      </el-date-picker>
      <el-button
        type="success"
        style="margin-top: 10px;margin-left: 10px"
        @click="handleSearch"
      >查询</el-button
      >
    </div>
    <el-table style="width: 100%;margin-top: 10px" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="expendTime" label="记录日期" width="width">
      </el-table-column>
      <el-table-column prop="nickName" label="消费者名字" width="width">
      </el-table-column>
      <el-table-column prop="ptMoney" label="平台获得" width="width">
      </el-table-column>
      <el-table-column prop="userMoney" label="出租车位获得" width="width">
      </el-table-column>
      <el-table-column prop="totalMoney" label="支出总费用" width="width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from '_axios@0.18.1@axios'

export default {
  name: "pay",
  data() {
    return {
      filterInput: "",
      value: '',
      list: [],
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList() {
      const { paydata } = this;
      let result = await this.$API.pay.reqPayList(paydata);
      if (result.code == 200) {
        this.total = result.data.tonpmtal;
        this.list = result.data;
      }
    },
    handleSearch() {
      if (this.filterInput) {
        this.list = this.list.filter((item) => {
          return item.nickName.match(this.filterInput);
        });
      } else {
        this.getPageList();
      }
    },
    fetchUsers() {
      axios
        .get("http://nimiao.natapp1.cc/query")
        .then((response) => {
          this.list = response.data;
          console.log(this.list);
        })
        .catch((res) => {
          console.log("error::", res);
        });
    },
    created() {
      this.fetchUsers();
    },
  },
}
</script>
<style>
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





