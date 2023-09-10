<script setup lang="ts">
import { MenuOption } from "naive-ui";
import { h, Component } from "vue";
import { ref } from "vue";
import { NIcon } from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  Download,
  SadSharp,
  Journal,
  Notifications,
} from "@vicons/ionicons5";
const collapsed = ref(false);
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions: MenuOption[] = [
  {
    label: "用户管理",
    key: "user",
    icon: renderIcon(PersonIcon),
  },
  {
    label: "部门管理",
    key: "department",
    icon: renderIcon(BookIcon),
  },
  {
    label: "职位管理",
    key: "position",
    icon: renderIcon(Journal),
  },
  {
    label: "员工管理",
    key: "staff",
    icon: renderIcon(SadSharp),
  },
  {
    label: "公告管理",
    key: "notice",
    icon: renderIcon(Notifications),
  },
  {
    label: "下载中心",
    key: "download",
    icon: renderIcon(Download),
  },
];

</script>

<template>
  <n-space vertical>
    <n-switch v-model:value="collapsed" />
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <span><router-view></router-view></span>
      </n-layout>
    </n-layout>
  </n-space>
</template>
