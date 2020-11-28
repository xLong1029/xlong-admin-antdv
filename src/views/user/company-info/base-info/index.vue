<template>
  <div v-if="!loading" class="base-info-container">
    <a-form
      ref="submitForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: labelColSpan }"
      :wrapper-col="{ span: wrapperColSpan }"
    >
      <!-- 编辑 -->
      <a-row v-if="disableEdit" :gutter="10">
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位名称">{{ form.companyName }}</a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="统一信用代码">{{ form.creditCode }}</a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位性质">{{ form.companyNature }}</a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位地址">{{ form.companyAddress }}</a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="法人姓名">{{ form.legalPersonName }}</a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="法人身份证号">{{
            form.legalPersonNumber
          }}</a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位联系人">{{ form.contacter }}</a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="联系人手机号">{{
            form.contacterPhone
          }}</a-form-item>
        </a-col>
      </a-row>
      <!-- 预览 -->
      <a-row v-else :gutter="10">
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位名称" name="companyName">
            <a-input
              v-model:value="form.companyName"
              placeholder="请输入单位名称"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="统一信用代码" name="creditCode">
            <a-input
              v-model:value="form.creditCode"
              placeholder="请输入统一信用代码"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位性质" name="companyNature">
            <a-select
              v-model:value="form.companyNature"
              class="width-100"
              placeholder="请选择企单位性质"
            >
              <a-select-option
                v-for="(item, index) in companyNatureList"
                :key="'companyNature' + index"
                :value="item"
                >{{ item }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位地址" name="companyAddress">
            <a-input
              v-model:value="form.companyAddress"
              placeholder="请输入单位地址"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="法人姓名" name="legalPersonName">
            <a-input
              v-model:value="form.legalPersonName"
              placeholder="请输入法人姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="法人身份证号" name="legalPersonNumber">
            <a-input
              v-model:value="form.legalPersonNumber"
              placeholder="请输入法人身份证号码"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="单位联系人" name="contacter">
            <a-input
              v-model:value="form.contacter"
              placeholder="请输入单位联系人姓名"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item label="联系人手机号" name="contacterPhone">
            <a-input
              v-model:value="form.contacterPhone"
              placeholder="请输入联系人手机号码"
            />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-form-item
            :wrapper-col="{ span: wrapperColSpan, offset: labelColSpan }"
          >
            <a-space size="small">
              <a-button @click="cancelChange">取消变更</a-button>
              <a-button
                type="primary"
                @click="onSubmit"
                :loading="submitLoading"
                >提交变更</a-button
              >
            </a-space>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, computed, watch, ref, toRaw } from "vue";
// 校验
import { validBusinessLicence, validIDcard, validPhone } from "utils/validate";
import Api from "api/company";

export default {
  name: "BaseInfo",
  props: {
    // 当前激活类型
    activeTabName: {
      type: String,
      default: "base",
    },
    // 数据
    data: {
      type: Object,
      default: () => ({}),
    },
    // 加载
    loading: {
      type: Boolean,
      default: true,
    },
    // 禁止编辑
    disableEdit: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, context) {
    const { ctx } = getCurrentInstance();

    const pageLoading = computed(() => ctx.$store.getters.pageLoading);

    const labelColSpan = 5;
    const wrapperColSpan = 19;

    const companyNatureList = [
      "事业单位",
      "国有企业",
      "集体所有制企业",
      "私营企业",
      "股份制企业",
      "外资企业",
    ];

    const defaultForm = {
      companyName: null,
      creditCode: null,
      companyNature: null,
      companyAddress: null,
      legalPersonName: null,
      legalPersonNumber: null,
      contacter: null,
      contacterPhone: null,
    };

    const form = reactive({ ...defaultForm });

    const validateBusinessLicence = (rule, value) => {
      if (!value) {
        return Promise.reject(new Error("请输入统一社会信用代码"));
      } else if (!validBusinessLicence(value)) {
        return Promise.reject(new Error("统一社会信用代码格式错误"));
      } else {
        return Promise.resolve();
      }
    };

    const validateIDcard = (rule, value) => {
      if (!value) {
        return Promise.reject(new Error("请输入法人身份证号码"));
      } else if (!validIDcard(value)) {
        return Promise.reject(new Error("身份证号格式错误"));
      } else {
        return Promise.resolve();
      }
    };

    const validatePhone = (rule, value) => {
      if (!value) {
        return Promise.reject(new Error("请输入联系人手机号码"));
      } else if (!validPhone(value)) {
        return Promise.reject(new Error("手机号码格式错误"));
      } else {
        return Promise.resolve();
      }
    };

    const rules = reactive({
      companyName: [
        { required: true, message: "请输入企业名称", trigger: "blur" },
      ],
      creditCode: [
        { required: true, validator: validateBusinessLicence, trigger: "blur" },
      ],
      companyNature: [
        { required: true, message: "请选择企业类型", trigger: "change" },
      ],
      companyAddress: [
        { required: true, message: "请输入单位地址", trigger: "blur" },
      ],
      legalPersonName: [
        { required: true, message: "请输入法人姓名", trigger: "blur" },
      ],
      legalPersonNumber: [
        { required: true, validator: validateIDcard, trigger: "blur" },
      ],
      contacter: [
        { required: true, message: "请输入单位联系人姓名", trigger: "blur" },
      ],
      contacterPhone: [
        { required: true, validator: validatePhone, trigger: "blur" },
      ],
    });

    // 监听data的变化
    watch(
      () => ctx.data,
      (val) => {
        let data =
          val && Object.keys(val).length ? { ...val } : { ...defaultForm };

        const {
          companyName,
          creditCode,
          companyNature,
          companyAddress,
          legalPersonName,
          legalPersonNumber,
          contacter,
          contacterPhone,
        } = data;

        form.companyName = companyName;
        form.creditCode = creditCode;
        form.companyNature = companyNature;
        form.companyAddress = companyAddress;
        form.legalPersonName = legalPersonName;
        form.legalPersonNumber = legalPersonNumber;
        form.contacter = contacter;
        form.contacterPhone = contacterPhone;
      }
    );

    // 提交loding
    const submitLoading = ref(false);

    // 单位id
    const companyId = computed(() => ctx.$store.getters.companyId);

    // 提交修改
    const onSubmit = () => {
      ctx.$refs.submitForm
        .validate()
        .then(async () => {
          submitLoading.value = true;
          const params = toRaw(form);

          Api.EditCompanyInfo(params, companyId.value)
            .then((res) => {
              if (res.code == 200) {
                context.emit("change", "变更基本信息");
                ctx.$message.success("基本信息变更成功！");
              } else ctx.$message.error("基本信息变更失败！");
            })
            .catch((err) => console.log(err))
            .finally(() => (submitLoading.value = false));
        })
        .catch((err) => {
          console.log("error", err);
        });
    };

    // 取消变更
    const cancelChange = () => {
      context.emit("change", "取消变更基本信息");
    };

    return {
      pageLoading,
      labelColSpan,
      wrapperColSpan,
      form,
      rules,
      companyNatureList,
      submitLoading,
      onSubmit,
      cancelChange,
    };
  },
};
</script>
<style lang="less" scoped>
.base-info-container {
}
</style>
