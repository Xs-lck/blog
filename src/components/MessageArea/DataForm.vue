<template>
  <form id="Dataform" ref="form" class="dataform-container">
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          maxlength="10"
          placeholder="用户昵称"
          v-model="formDataRef.nickname"
        />
        <span class="tip">{{ formDataRef.nickname?.length }}/10</span>
      </div>
      <div class="err">{{ errorRef.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea
          maxlength="300"
          placeholder="输入内容"
          v-model="formDataRef.content"
        ></textarea>
        <span class="tip">{{ formDataRef.content.length }}/300</span>
      </div>
      <div class="err">{{ errorRef.content }}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmitingRef" @click="handleSubmit">
          {{ isSubmitingRef ? '提交中...' : '提交' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { getCurrentInstance } from 'vue';
import type { formData } from '@/type/blog';

const { proxy }: any = getCurrentInstance();

const formDataRef = ref<formData>({
  nickname: '',
  content: '',
});

const errorRef = ref<formData>({
  nickname: '',
  content: '',
});

const isSubmitingRef = ref(false);

const form = ref(null);

const emit = defineEmits<{
  (
    e: 'submit',
    value: formData,
    fn: (msg: string, type?: string) => void
  ): void;
}>();

const handleSubmit = () => {
  errorRef.value.nickname = formDataRef.value.nickname ? '' : '请输入昵称';
  errorRef.value.content = formDataRef.value.content ? '' : '请输入内容';
  if (errorRef.value.nickname || errorRef.value.content) {
    return;
  }
  isSubmitingRef.value = true; //正在提交中，防止重复点击
  emit('submit', formDataRef.value, (msg: string, type = 'success') => {
    proxy.$showMessage(msg, type, 1000, form.value, () => {
      formDataRef.value.nickname = '';
      formDataRef.value.content = '';
      isSubmitingRef.value = false;
    });
  });

  // 利用$attrs调用
  // const callback = (msg: string, type = 'success') => {
  //   proxy.$showMessage(msg, type, 1000, form.value, () => {
  //     formDataRef.value.nickname = '';
  //     formDataRef.value.content = '';
  //     isSubmitingRef.value = false;
  //   });
  // };
  // proxy.$attrs.onSubmit(formDataRef.value, callback);
};
</script>

<style scoped lang="less">
@import '~@/style/var.less';
.dataform-container {
  width: 100%;
  // height: 100%;
  box-sizing: border-box;
  // padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 18px;
}
.input-area {
  width: 50%;
  height: 40px;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  font-size: 14px;
  border-radius: 5px;
  &:focus {
    border-color: @primary;
  }
}
input {
  height: 40px;
  padding: 0 15px;
}
textarea {
  resize: none;
  height: 120px;
  padding: 8px 15px;
}
.err {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  width: 100px;
  height: 35ox;
  line-height: 30px;
  border: none;
  outline: none;
  color: #fff;
  background: @primary;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    background: darken(@primary, 10%);
  }
  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>
