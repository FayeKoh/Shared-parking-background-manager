<template>
  <v-content>
    <v-app-bar app class="px-1 app-name" color="white" elevate-on-scroll>
  <slot class="logocontainer">
    <img
      src="favicon.jpg"
      style="width: 2%;margin-left: 10%"
      @click=""
    />
  </slot>
  <v-toolbar-title style="margin-left: 5%">
    XXX共享停车 · 后台管理系统
  </v-toolbar-title>
  <v-spacer />
  <v-list right style="padding-left: 5%;background-color: rgba(0,0,0,0)">
    <v-btn
        bold
        dark
        style="margin-right: 20px"
        rounded
        color="#283443"
        @click=""
    >进入官网</v-btn
    >
  </v-list>
</v-app-bar>
    <v-form>
      <v-container id="container">
        <v-row
          style="margin-top: 100px;margin-left: 20%"
          align="center"
          justify="center"
        >
          <v-col cols="12" sm="10" >
            <v-card class="elevation-6 mt-10" style="box-shadow: 0 0 10px #888888">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row style="margin-left: 0;margin-right: 0">
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12" style="margin-left: 10%">
                        <h3 class="text-center bold" style="margin-left: 25%">
                          登 录 您 的 帐 户
                        </h3>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8" style="margin-top: 10%"       ref="loginForm"
                                 :model="loginForm">
                            <v-text-field
                              v-model="adminName"
                              label="账户"
                              :rules="usernameRules"
                              outlined
                              dense
                              color="#FF4F5A"
                              autocomplete="false"
                              class="mt-10"
                              style="width: 200%;"
                            />
                            <v-text-field
                              v-model="adminPwd"
                              label="密码"
                              outlined
                              dense
                              color="#FF4F5A"
                              autocomplete="false"
                              type="password"
                            />
                            <v-row style="margin-top: -10%">
                              <v-col cols="12" sm="7">
<!--                                <v-checkbox-->
<!--                                  label="7天内保持登录"-->
<!--                                  class="mt-n1"-->
<!--                                  color="#FF4F5A"-->
<!--                                >-->
<!--                                </v-checkbox>-->
                                <br>
                                <el-checkbox v-model="checked" label="7天内保持登录"></el-checkbox>
                              </v-col>

                            </v-row>
                            <v-btn
                              class="bold"
                              color="#FF4F5A"
                              dark
                              block
                              tile
                              @click="checkLogin"
                              style="background-color: #7B68EE;margin-top: 5%"
                              >登 录</v-btn
                            >

                            <h5 class="text-center grey--text mt-4 mb-3" style="margin-top: 10%;text-align: center">
                              其他方式登录
                            </h5>
                            <hr>
                            <div
                              class="d-flex justify-space-between align-center mx-10 mb-16"
                              style="margin-top: 5%"
                            >
                              <v-btn depressed outlined color="blue">
                                <v-icon color="blue">fab fa-qq</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="green" style="margin-left: 22%">
                                <v-icon color="green">fab fa-weixin</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="red" style="margin-left: 21%">
                                <v-icon color="red">fab fa-weibo</v-icon>
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="rounded-bl-xl"
                      style="background-color: #283443"
                    >
                      <div style="text-align: center; padding: 180px 0;">
                        <v-card-text class="white--text">
                          <h3 class="text-center bold" style="color: whitesmoke">
                            还没有创建自己的帐户？
                          </h3>
                          <h6 class="text-center" style="color: whitesmoke">
                            让我们为您完成所有设置，以便您可以开始创建您的帐户
                          </h6>
                        </v-card-text>
                        <div class="text-center">
                          <v-btn class="bold" tile outlined dark @click="step++" style="border-radius: 5px" > 注 册 </v-btn>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row style="margin-left: 0;margin-right: 0">
                    <v-col
                      cols="12"
                      md="6"
                      class="rounded-br-xl"
                      style="background-color: #283443"
                    >
                      <div style="text-align: center; padding: 160px 0">
                        <v-card-text class="white--text">
                          <h3 class="text-center bold" style="color: whitesmoke">已经注册自己的账户？</h3>
                          <h6 class="text-center" style="color: whitesmoke">登录到您的帐户</h6>
                        </v-card-text>
                        <div class="text-center bold">
                          <v-btn class="bold" tile outlined dark @click="step--" style="border-radius: 5px">登 录</v-btn>
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12" style="margin-left: 10%">
                        <h3 class="text-center bold" style="margin-left: 25%">注 册 新 账 号</h3>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8" style="margin-top: 10%">
                            <v-text-field
                              v-model="username"
                              label="用户账户"
                              :rules="usernameRules"
                              outlined
                              dense
                              color="#FF4F5A"
                              autocomplete="false"
                            />
                            <v-text-field
                              v-model="password"
                              label="密码"
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[
                                passwordRules.required,
                                passwordRules.min,
                              ]"
                              :type="show ? 'text' : 'password'"
                              outlined
                              dense
                              color="#FF4F5A"
                              autocomplete="false"
                              hint="At least 8 characters"
                              @click:append="show = !show"
                            />

                            <v-text-field
                              v-model="rePassword"
                              label="确认密码"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[
                                passwordRules.required,
                                passwordConfirmationRule,
                              ]"
                              :type="show2 ? 'text' : 'password'"
                              outlined
                              dense
                              color="#FF4F5A"
                              autocomplete="false"
                              hint="At least 8 characters"
                              @click:append="show2 = !show2"
                            />
                            <el-select
                              style="border-radius: 5px;width: 100%;border: 1px solid gray"
                              v-model="value"
                              filterable
                              placeholder="创建一个账户为"
                            >
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled"
                              >
                              </el-option>
                            </el-select>

                            <v-btn
                              class="bold"
                              color="#FF4F5A"
                              dark
                              block
                              tile
                              @click="signUp"
                              style="background-color: #7B68EE;margin-top: 10%"
                              >注 册</v-btn
                            >
                            <h5 class="text-center grey--text mt-4 mb-3" style="margin-top: 10%;text-align: center">
                              其他方式注册
                            </h5>
                            <hr>
                            <div
                              class="d-flex justify-space-between align-center mx-10 mb-16"
                              style="margin-top: 5%"
                            >
                              <v-btn depressed outlined color="blue">
                                <v-icon color="blue">fab fa-qq</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="green" style="margin-left: 22%">
                                <v-icon color="green">fab fa-weixin</v-icon>
                              </v-btn>
                              <v-btn depressed outlined color="red" style="margin-left: 21%">
                                <v-icon color="red">fab fa-weibo</v-icon>
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>

        <v-snackbar v-model="snackbar">
          {{ message }}
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-form>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    options: [
      {
        value: "商户账户",
        label: "商户账户",
      },
      {
        value: "客户账户",
        label: "客户账户",
      },
      {
        value: "管理员账户",
        label: "管理员账户",
        disabled: true
      },
    ],
    checked: true,
    value: "",
    components: {
    },
    step: 1,
    loginForm:{
      adminName:"admin",
      adminPwd:"111111",
    },
    username: "",
    password: "",
    rePassword: "",
    show: false,
    show2: false,
    snackbar: false,
    message: "",


    usernameRules: [
      (v) => !!v || "*必填选项",
    ],
    passwordRules: {
      required: (value) => !!value || "*必填选项",
      min: (v) => v.length >= 8 || "最少 8 个字符",
    },
  }),
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  props: {
    source: String,
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.rePassword || "两次密码输入不一致"
    },
  },
  methods: {
    //login request
    checkLogin: function () {
      this.loading = true;
      this.$store
        .dispatch("user/login", this.loginForm)
        .then(() => {
          let role = localStorage.getItem('role')
          this.$router.push({ path: this.redirect || "/" });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    //sign-up request
    signUp: function () {
      if (this.value === "商户账户") {
        axios
          .post("http://nimiao.natapp1.cc/m/register", {
            merchantName: this.username,
            merchantPassword: this.password,
          })
          .then((Response) => {
            this.message = Response.data
            this.snackbar = true
          })
        this.$message({
          type: "success",
          message: "商户账户注册成功!",
        });
      } else {
        axios
          .post("http://nimiao.natapp1.cc/c/register", {
            clientName: this.username,
            clientPassword: this.password,
          })
          .then((Response) => {
            this.message = Response.data
            this.snackbar = true
          })
        this.$message({
          type: "success",
          message: "客户账户注册成功!",
        });
      }
    },
  },
}
</script>

<style>

.el-input__inner {
  height: 32px !important;
}
.bold {
  font-weight: bold;
}
.rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
.btn-dimensions {
  min-height: 25px;
  max-width: 200px;
}
.v-text-field--outlined.v-input--dense.v-text-field--outlined
> .v-input__control
> .v-input__slot,
.v-text-field--outlined.v-input--dense.v-text-field--outlined.v-text-field--filled
> .v-input__control
> .v-input__slot {
  min-height: 20px;
  max-width: 500px !important;
}
</style>
