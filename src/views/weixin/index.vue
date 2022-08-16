<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDialog"
    >添加</el-button
    >
    <div style="float: right">
      <el-input
        placeholder="请输入"
        style="width: 200px"
        prefix-icon="el-icon-search"
        v-model="filterInput"
        clearable
      />
      <el-button
        type="success"
        style="margin-top: 10px;margin-left: 10px"
        @click="handleSearch"
      >查询</el-button
      >
    </div>

    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="nickName" label="微信授权登录昵称" width="width">
      </el-table-column>
      <el-table-column prop="gender" label="微信授权登录性别" width="width">
      </el-table-column>
      <el-table-column prop="province" label="微信授权登录省份" width="width">
      </el-table-column>
      <el-table-column prop="userMoney" label="钱包(元)" width="width">
      </el-table-column>
      <el-table-column prop="loginTime" label="微信授权登录时间" width="width">
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="200px">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateWeixin(row)"
          >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteWeixin(row)"
          >删除</el-button
          >
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      :title="weForm.userId ? '修改微信用户信息' : '添加微信用户信息'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="weForm" :rules="rules" ref="ruleForm">
        <el-form-item label="微信授权登录昵称" label-width="150px" prop="nickName">
          <el-input autocomplete="off" v-model="weForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="微信授权登录性别" label-width="150px" prop="gender">
          <el-select v-model="weForm.gender" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微信授权登录省份" label-width="150px" prop="province">
          <el-select v-model="weForm.province" filterable  placeholder="请选择">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="钱包(元)" label-width="150px" prop="userMoney">
          <el-input autocomplete="off" v-model="weForm.userMoney"></el-input>
        </el-form-item>
        <el-form-item label="微信授权登录时间" label-width="150px" prop="loginTime">
          <el-date-picker
            v-model="weForm.loginTime"
            align="right"
            type="datetime"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateWeixin"
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>



</template>

<script>
import axios from '_axios@0.18.1@axios'

export default {
  name: "weixin",
  data() {
    return {
      filterInput: "",
      searchObj: { // 包含请求搜索条件数据的对象
        weixinLoginId: ''
      },
      tempSearchObj: { // 收集搜索条件输入的对象
        weixinLoginId: ''
      },
      cities: [{
        value: '北京市',
        label: '北京市'
      }, {
        value: '台湾省',
        label: '台湾省'
      }, {
        value: '香港特别行政区',
        label: '香港特别行政区'
      }, {
        value: '澳门特别行政区',
        label: '澳门特别行政区'
      }],
      options: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }, {
        value: '不选择',
        label: '不选择'
      }],
      value: '',
      list: [],
      dialogFormVisible: false,
      weForm: {
        nickName: "",
        gender: "",
        province: "",
        userMoney: "",
        loginTime: "",
      },
      rules: {
        nickName: [{ required: true, message: "请输入微信授权登录昵称" }],
        gender: [{ required: true, message: "请输入微信授权登录性别" }],
        province: [{ required: true, message: "请输入微信授权登录省份" }],
        userMoney: [{ required: true, message: "请输入钱包(元)" }],
        loginTime: [{ required: true, message: "请输入微信授权登录时间" }],

      },
    };
  },
  mounted() {
    this.getPageList();
  },
  created () {
    this.getSearchId()
  },
  methods: {
    async getPageList() {
      const { wedata } = this;
      let result = await this.$API.weixin.reqWeixinList(wedata);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data;
      }
    },
    async getSearchId () {
      const {searchObj} = this
      this.listLoading = true
      const result = await this.$API.weixin.reqSearchWeixinList(searchObj)
      console.log(result)
      this.listLoading = false
      if (result.code == 200) {
        this.list = result.data.list;
      }
    },

    showDialog() {
      this.dialogFormVisible = true;
      this.weForm = {
        nickName: "",
        gender: "",
        province: "",
        userMoney: "",
        loginTime: "",
      };
    },
    updateWeixin(row) {
      this.dialogFormVisible = true;
      this.weForm = { ...row };
    },
    addOrUpdateWeixin() {
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$API.weixin.reqAddOrUpdateWeixin(
            this.weForm
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.weForm.userId ? "修改微信用户信息成功" : "添加微信用户信息成功",
            });
            await this.getPageList(this.weForm.userId ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteWeixin(row) {
      this.$confirm(`你确定删除微信授权登录昵称为 ${row.nickName} 的相关信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          let result = await this.$API.weixin.reqDeleteWeixin(row.userId);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            await this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
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
        .get("http://nimiao.natapp1.cc/queryId/")
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




