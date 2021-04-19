<template>
  <div id="productCategroys">
    <!-- 面包导航 -->
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物资流向</el-breadcrumb-item>
      <el-breadcrumb-item>物资来源</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧卡片区域 -->
    <!-- 用户列表卡片区 -->
    <el-card class="box-card">
      <el-form
        size="mini"
        :inline="true"
        :model="queryMap"
        class="demo-form-inline"
      >
        <el-form-item label="省市区县">
          <el-input
            v-model="inputdiqu"
            clearable
            @clear="search"
            placeholder="省市区县"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input
            v-model="inputcontact"
            clearable
            @clear="search"
            placeholder="联系人"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-search" @click="search" type="primary">
            查询</el-button
          >
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="addDialogVisible = true"
            >添加</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 表格区域 -->
      <template>
        <el-table
          border
          size="mini"
          stripe
          :data="supplierData"
          style="width: 100%"
          height="460"
        >
          <el-table-column
            prop="id"
            label="ID"
            type="index"
            width="50"
          ></el-table-column>
    <!-- <p>{{supplierData[0].id}}</p> -->
          <el-table-column label="物资提供方地址">
            <el-table-column prop="address" label="省份" width="130">
              <template slot-scope="scope">
                <span v-text="scope.row.address.split('/')[0]"></span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="市" width="100">
              <template slot-scope="scope">
                <span v-text="scope.row.address.split('/')[1]"></span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="区县" width="100">
              <template slot-scope="scope">
                <span v-text="scope.row.address.split('/')[2]"></span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="地址" width="180">
            </el-table-column>
          </el-table-column>

          <el-table-column
            prop="create_time"
            label="创建时间"
            width="180"
            :formatter="dateFormat"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="contact"
            label="联系人"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            width="80"
          ></el-table-column>
          <el-table-column label="操作" fixed="right" width="180">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                icon="el-icon-edit"
                @click="edit(scope.row.id)"
                >编辑</el-button
              >

              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                @click="del(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        style="margin-top: 10px"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryMap.pageNum"
        :page-sizes="[10, 15, 20]"
        :page-size="this.queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 来源添加弹出框 -->
      <el-dialog title="添加来源" :visible.sync="addDialogVisible" width="50%">
        <span>
          <el-form
            :model="addRuleForm"
            :rules="addRules"
            ref="addRuleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row>
              <el-col :span="15">
                <div class="grid-content bg-purple"></div>
                <el-form-item label="选择地区" prop="valueProvince">
                <el-cascader
                    size="large"
                    :options="options"
                    v-model="addRuleForm.provinceList"
                    @change="handleChange">
                    </el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="来源 名称" prop="name">
              <el-input v-model="addRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="addRuleForm.contact"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addRuleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="addRuleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="addRuleForm.sort"
                :min="1"
                :max="10"
                label="排序"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiao1">取 消</el-button>
          <el-button type="primary" @click="add1('addRuleForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 系别编辑弹出框 -->
      <el-dialog
        title="更新来源"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeEditDialog"
      >
        <span>
          <el-form
            :model="editRuleForm"
            ref="editRuleFormRef"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="省市区县">
              <el-input disabled v-model="address1"></el-input>
            </el-form-item>

            <el-form-item label="来源详细地" prop="name">
              <el-input type="textarea" v-model="name1"></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="contact1"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
              <el-input v-model="email1"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="phone">
              <el-input v-model="phone1"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="sort1"
                :min="1"
                :max="10"
                label="排序"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="update1('editRuleFormRef')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>

</template>

<script>
import axios from "axios";
import moment from "moment";
import { regionData,CodeToText } from 'element-china-area-data'
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      inputdiqu:'',
      inputcontact:'',
      inputname:'',
      options: regionData,
      address1:'', 
      valueCity: "",
      name: "",
      name1:'',
      sort: "",
      sort1:'',
      valueProvince: "",
      valueOrigin: "",
      phone: "",
      phone1:'',
      contact: "",
      contact1:'',
      email: "",
      email1:'',
      loading: true,
      editDialogVisible: false,
      addDialogVisible: false, //添加弹框是否显示
      total: 0, //总共多少条数据
      supplierData: [], //表格数据
      queryMap: { pageNum: 1, pageSize: 10, name: "" }, //查询对象
      addRuleForm: {}, //添加表单数据
      editRuleForm: {}, //修改表单数据
      deans: [], //所有系主任
      addRules: {
        name: [
          { required: true, message: "请输入来源名称", trigger: "blur" },
          {
            min: 2,
            max: 50,
            message: "长度在 2 到 50 个字符",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入地址信息", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 12 个字符",
            trigger: "blur",
          },
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        // valueProvince: [
        //   { required: true, message: "请选择地区", trigger: "blur" },
        // ],
        // valueCity: [{ required: true, message: "请输入城市", trigger: "blur" }],
        // valueOrigin: [
        //   { required: true, message: "请输入区县", trigger: "blur" },
        // ],
        sort: [{ required: true, message: "请输入排序号", trigger: "blur" }],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "请输入联系方式",
            validator: checkPhone,
            trigger: "blur",
          },
        ],
      }, //添加验证
      provinceList: [], // 省列表
      cityList: [], // 市列表
      originList: [], // 区列表
    };
  },
  methods: {
    //时间戳
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    //添加
    add1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addDialogVisible = false;
          axios({
            url: "http://127.0.0.1:7001/xyt/addNewWuzi",
            method: "post",
            data: {
              address: CodeToText[this.addRuleForm.provinceList[0]] + '/' + CodeToText[this.addRuleForm.provinceList[1]] + '/' + CodeToText[this.addRuleForm.provinceList[2]],
              name: this.addRuleForm.name,
              contact: this.addRuleForm.contact,
              email: this.addRuleForm.email,
              phone: this.addRuleForm.phone,
              sort: this.addRuleForm.sort,
            },
          })
            .then((res) => {
              console.log(res.data);
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.addRuleForm.provinceList = '';
              this.$refs[formName].resetFields();
              this.getbasedata();
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                type: "error",
                message: "添加失败!",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
          return false;
        }
      });
    },
    quxiao1() {
      this.$message("取消操作");
      this.addDialogVisible = false;
    },
    //返回所有物资表
    getbasedata() {
      axios.get("http://127.0.0.1:7001/xyt/listAll").then((res) => {
        //   console.log('返回所有物资表',res.data);
        this.supplierData = res.data.result;
        console.log('啦啦啦啦',this.supplierData);
      });
    },
    //搜索
    search() {
          axios({
            url: "http://127.0.0.1:7001/xyt/listwuzi",
            method: "post",
            data: {
              address: this.inputdiqu,
              contact: this.inputcontact
            },
          }).then(res => {
            console.log(res.data.result);
            this.supplierData = res.data.result;
          })

      console.log(this.inputdiqu,this.inputcontact);
      this.getbasedata();
    },
    //删除来源
    async del(id) {
        console.log(id);
      const res = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (res === "confirm") {
        axios.post('http://127.0.0.1:7001/xyt/delwuzi',{id:id}).then(resolve => {
          console.log(resolve);
        if (resolve.data.statuscode == 200) {
          this.$message.success("来源删除成功");
          this.getbasedata();
        } else {
          this.$message.error("删除失败");
          this.getbasedata();
        }
        })
      }
    },
 
    //编辑 根据id获取数据库中的对应数据
    async edit(id) {
      console.log(id);
      this.editDialogVisible = true;
      axios.post('http://127.0.0.1:7001/xyt/updatehuoqu',{id:id}).then(resolve => {
        console.log(resolve);
        console.log(resolve.data.result[0].address);
        this.id = resolve.data.result[0].id;
        this.address1 = resolve.data.result[0].address;
        this.name1 = resolve.data.result[0].name;
        this.contact1 = resolve.data.result[0].contact;
        this.email1 = resolve.data.result[0].email;
        this.sort1 = resolve.data.result[0].sort;
        this.phone1 = resolve.data.result[0].phone;
      })
    },
    //编辑 提交编辑
    update1(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.id,this.address1,this.name1,this.contact1,this.email1,this.phone1,this.sort1);
        if (valid) {
          this.editDialogVisible = false;
          axios({
            url: "http://127.0.0.1:7001/xyt/updatewuzi",
            method: "post",
            data: {
              address: this.address1,
              name: this.name1,
              contact: this.contact1,
              email: this.email1,
              phone: this.phone1,
              sort: this.sort1,
              id: this.id
            },
          })
            .then((res) => {
              console.log(res.data);
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.addRuleForm.provinceList = '';
              this.$refs[formName].resetFields();
              this.getbasedata();
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                type: "error",
                message: "修改失败!",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
          return false;
        }
      });
    },

    //加载系别列表
    // async getSupplierList() {
    //   const { data: res } = await this.$http.get(
    //     "/xyt/listAll",
    //     {
    //       params: this.queryMap,
    //     }
    //   );
    //   if (!res.success) {
    //     return this.$message.error("获取用户列表失败:" + res.data.errorMsg);
    //   } else {
    //     this.total = res.data.total;
    //     this.supplierData = res.data.rows;
    //     console.log("传参", this.queryMap);
    //   }
    // },

    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getbasedata();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getbasedata();
    },
    //关闭弹出框
    closeAddDialog() {
      this.$refs.addRuleFormRef.clearValidate();
      this.addRuleForm = {};
    },
    //关闭弹出框
    closeEditDialog() {
      this.$refs.editRuleFormRef.clearValidate();
      this.editRuleForm = {};
    },
    handleChange (value) {
        console.log(CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]])
      }
  },
  created() {
    this.getbasedata();
  },
};
</script>
