<script lang="ts" setup>
import { watch } from "vue";
import { ref } from "vue";
interface objType {
  [key: string]: any;
}
const { formData, edit } = defineProps<{
  formData: Array<any>;
  edit: objType;
}>();
const emit = defineEmits(["update:modelValue", "submitData"]);
const showModel = ref(true);
const inputValue = ref<objType>({ ...edit });

watch([showModel], () => {
  emit("update:modelValue", showModel.value);
});

function changeInput(key: string, value: string) {
  inputValue.value[key] = value;
}
function onPositiveClick(option: string) {
  if (option === "confirm") {
    emit("submitData", inputValue.value);
  }
}
</script>
<template>
  <n-modal
    v-model:show="showModel"
    class="w-1/2"
    preset="dialog"
    title="填写信息"
    positive-text="确认"
    negative-text="取消"
    @positive-click="onPositiveClick('confirm')"
    @negative-click="onPositiveClick('cancel')"
  >
    <!-- <template #header>
      <div>填写信息</div>
      </template> -->
    <div>
      <n-form
        ref="formRef"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item
          v-for="(item, i) in formData"
          :key="i"
          size="large"
          :label="item.label"
          path="inputValue"
        >
          <input
            :value="inputValue[item.key]"
            class="border-none w-full h-full text-xl py-1 pl-3 text-gray-500 focus:border-none"
            :type="item?.type ? item.type : 'text'"
            :placeholder="'请输入' + item.label"
            @blur="
              changeInput(item.key, ($event.target as HTMLInputElement).value)
            "
          />
        </n-form-item>
      </n-form>
    </div>
    <!-- <template #action>
        <div>操作</div>
      </template> -->
  </n-modal>
</template>

<style scoped></style>
