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
      <el-table-column prop="nickName" label="停车车主" width="width">
      </el-table-column>
      <el-table-column prop="bleName" label="蓝牙名字" width="width">
      </el-table-column>
      <el-table-column prop="stopPlace" label="停车地点" width="width">
      </el-table-column>
      <el-table-column prop="stopMoney" label="停车费用(元)" width="width">
      </el-table-column>
      <el-table-column prop="startTime" label="开始停车时间" width="width">
      </el-table-column>
      <el-table-column prop="overTime" label="结束停车时间" width="width">
      </el-table-column>


      <el-table-column prop="prop" label="操作" width="200px">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateStop(row)"
          >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteStop(row)"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="stForm.stopId ? '修改停车信息' : '添加停车信息'"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="width: 80%" :model="stForm" :rules="rules" ref="ruleForm">
        <el-form-item label="停车车主" label-width="150px" prop="nickName">
          <el-input autocomplete="off" v-model="stForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="蓝牙名字" label-width="150px" prop="bleName">
          <el-input autocomplete="off" v-model="stForm.bleName"></el-input>
        </el-form-item>
        <el-form-item label="停车地点" label-width="150px" prop="stopPlace">
          <el-input autocomplete="off" v-model="stForm.stopPlace"></el-input>
        </el-form-item>
        <el-form-item label="停车费用(元)" label-width="150px" prop="stopMoney">
          <el-input autocomplete="off" v-model="stForm.stopMoney"></el-input>
        </el-form-item>
        <el-form-item label="开始停车时间" label-width="150px" prop="startTime">
          <el-date-picker
            v-model="stForm.startTime"
            align="right"
            type="datetime"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束停车时间" label-width="150px" prop="overTime">
          <el-date-picker
            v-model="stForm.overTime"
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
        <el-button type="primary" @click="addOrUpdateStop"
        >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '_axios@0.18.1@axios'

export default {
  name: "stop",
  data() {
    //自定义校验规则
    var validateTmName = (rule, value, callback) => {
      //自定义校验规则
      if (value.length < 1 || value.length > 20) {
        callback(new Error("输入错误"));
      } else {
        callback();
      }
    };
    return {
      filterInput: "",
      value: '',
      list: [],
      dialogFormVisible: false,
      stForm: {
        nickName: "",
        bleName: "",
        stopPlace: "",
        stopMoney: "",
        startTime: "",
        overTime: "",
      },
      rules: {
        nickName: [
          { required: true, message: "请输入停车车主", trigger: "blur" },
          { validator: validateTmName, trigger: "change" },
        ],
        bleName: [{ required: true, message: "请输入蓝牙名字" }],
        stopPlace: [{ required: true, message: "请输入停车地点" }],
        stopMoney: [{ required: true, message: "请输入停车费用(元)" }],
        startTime: [{ required: true, message: "请输入开始停车时间" }],
        overTime: [{ required: true, message: "请输入结束停车时间" }],
      },
    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {

    async getPageList() {
      const { stdata } = this;
      let result = await this.$API.stop.reqStopList(stdata);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data;
      }
    },

    showDialog() {
      this.dialogFormVisible = true;
      this.stForm = {
        nickName: "",
        bleName: "",
        stopPlace: "",
        stopMoney: "",
        startTime: "",
        overTime: "",
      };
    },
    updateStop(row) {
      this.dialogFormVisible = true;
      this.stForm = { ...row };
    },
    addOrUpdateStop() {
      this.$refs.ruleForm.validate(async(success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$API.stop.reqAddOrUpdateStop(
            this.stForm
          );
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.stForm.stopId ? "修改停车信息成功" : "添加停车信息成功",
            });
            await this.getPageList(this.stForm.stopId ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteStop(row) {
      this.$confirm(`你确定删除停车车主为 ${row.nickName} 的相关停车信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          let result = await this.$API.stop.reqDeleteStop(row.stopId);
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
        .get("http://nimiao.natapp1.cc/querystop")
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




