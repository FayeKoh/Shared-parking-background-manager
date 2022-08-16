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
      <el-table-column prop="ownerName" label="车位主名称" width="width">
      </el-table-column>
      <el-table-column prop="stallPlace" label="车位地址" width="300px">
      </el-table-column>
      <el-table-column prop="ownerPhone" label="车位主电话" width="width">
      </el-table-column>
      <el-table-column prop="bleName" label="蓝牙名称" width="width">
      </el-table-column>
      <el-table-column prop="stallTime" label="开始出租时间" width="200px">
      </el-table-column>
      <el-table-column prop="endTime" label="结束出租时间" width="200px">
      </el-table-column>
      <el-table-column prop="price" label="每小时花费(元)" width="150px">
      </el-table-column>
      <el-table-column prop="stallState" label="车位状态" width="width">
      </el-table-column>
<!--      <el-table-column prop="latitude" label="经纬度" width="width">-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="longitude" label="经纬度" width="width">-->
<!--      </el-table-column>-->


      <el-table-column prop="prop" label="操作" width="200">
        <template slot-scope="{ row, $index }">

          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateParking(row)"
          >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteParking(row)"
          >删除</el-button
          >
<!--          <el-button-->
<!--            type="danger"-->
<!--            icon="el-icon-delete"-->
<!--            size="mini"-->
<!--            @click="banParking(row)"-->
<!--          >禁租</el-button-->
<!--          >-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="paForm.stallId ? '修改车位信息' : '添加车位信息'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="paForm" :rules="rules" ref="ruleForm">
        <el-form-item label="车位主名称" label-width="150px" prop="ownerName">
          <el-input autocomplete="off" v-model="paForm.ownerName"></el-input>
        </el-form-item>
        <el-form-item label="车位地址" label-width="150px" prop="stallPlace">
          <el-input autocomplete="off" v-model="paForm.stallPlace"></el-input>
        </el-form-item>
        <el-form-item label="车位主电话" label-width="150px" prop="ownerPhone">
          <el-input autocomplete="off" v-model="paForm.ownerPhone"></el-input>
        </el-form-item>
        <el-form-item label="蓝牙名称" label-width="150px" prop="bleName">
          <el-input autocomplete="off" v-model="paForm.bleName"></el-input>
        </el-form-item>
        <el-form-item label="开始出租时间" label-width="150px" prop="stallTime">
<!--          <el-input autocomplete="off" v-model="paForm.stallTime"></el-input>-->
          <el-date-picker
            v-model="paForm.stallTime"
            align="right"
            type="datetime"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束出租时间" label-width="150px" prop="endTime">
<!--          <el-input autocomplete="off" v-model="paForm.endTime"></el-input>-->
          <el-date-picker
            v-model="paForm.endTime"
            align="right"
            type="datetime"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="每小时花费(元)" label-width="150px" prop="price">
          <el-input autocomplete="off" v-model="paForm.price"></el-input>
        </el-form-item>
        <el-form-item label="车位状态" label-width="150px" prop="stallState">
<!--          <el-input autocomplete="off" v-model="paForm.stallState"></el-input>-->
          <el-select v-model="paForm.stallState" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateParking"
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "parking",
  data() {
    //自定义校验规则
    var validateTmName = (rule, value, callback) => {
      //自定义校验规则
      if (value.length < 1 || value.length > 20) {
        callback(new Error("品牌名称错误"));
      } else {
        callback();
      }
    };
    return {
      filterInput: "",
      tempSearchObj: { // 收集搜索条件数据
        ownerName: '',
      },
      ownerName: '',
      searchObj: { // 发送请求的条件参数数据
      },
      options: [{
        value: '使用中',
        label: '使用中'
      }, {
        value: '空闲中',
        label: '空闲中'
      }, {
        value: '禁租中',
        label: '禁租中'
      }],
      value: '',
      list: [],
      dialogFormVisible: false,
      paForm: {
        ownerName: "",
        stallPlace: "",
        ownerPhone: "",
        bleName: "",
        stallUrl: "",
        stallTime: "",
        endTime: "",
        price: "",
        stallState: "",
        latitude: "",
        longitude: "",
        username: "",
        stallParse: "",
        endParse: "",
      },
      rules: {
        ownerName: [
          { required: true, message: "请输入车位主名称", trigger: "blur" },
          { validator: validateTmName, trigger: "change" },
        ],
        stallPlace: [{ required: true, message: "请输入车位地址" }],
        ownerPhone: [{ required: true, message: "请输入车位主电话" }],
        bleName: [{ required: true, message: "请输入蓝牙名称" }],
        stallTime: [{ required: true, message: "请输入开始出租时间" }],
        endTime: [{ required: true, message: "请输入结束出租时间" }],
        price: [{ required: true, message: "请输入每小时花费" }],
        stallState: [{ required: true, message: "请输入车位状态" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList() {
      const { padata } = this;
      let result = await this.$API.parking.reqParkingList(padata);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data;
      }
    },

    showDialog() {
      this.dialogFormVisible = true;
      this.paForm = {
        ownerName: "",
        stallPlace: "",
        ownerPhone: "",
        bleName: "",
        stallUrl: "",
        stallTime: "",
        endTime: "",
        price: "",
        username: ""
      };
    },
    updateParking(row) {
      this.dialogFormVisible = true;
      this.paForm = { ...row };
    },

    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.paForm.stallUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addOrUpdateParking() {
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$API.parking.reqAddOrUpdateParking(
            this.paForm
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.paForm.stallId ? "修改车位信息成功" : "添加车位信息成功",
            });
            await this.getPageList(this.paForm.stallId ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteParking(row) {
      this.$confirm(`你确定删除车位主名称为 ${row.ownerName} 的相关车位信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          let result = await this.$API.parking.reqDeleteParking(row.stallId);
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
    // async banParking(row) {
    //   const { padata } = this;
    //   let result = await this.$API.parking.reqBanParking(padata);
    //   if (result.code == 200) {
    //     this.$message({type: "success", message: "车位已禁租"});
    //     await this.getPageList();
    //   }
    // },
    handleSearch() {
      if (this.filterInput) {
        this.list = this.list.filter((item) => {
          return item.ownerName.match(this.filterInput);
        });
      } else {
        this.getPageList();
      }
    },
    fetchUsers() {
      axios
        .get("http://nimiao.natapp1.cc/queryid")
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




