<script setup lang="ts">
import { MenuOption } from "naive-ui";
import { NIcon } from "naive-ui";
import GlobalLogo from "@/components/common/GlobalLogo.vue";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  Download,
  SadSharp,
  Journal,
  Notifications,
} from "@vicons/ionicons5";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, h, Component } from "vue";
import { onMounted } from "vue";
const router = useRouter();
const route = useRoute();
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
    label: "用户角色管理",
    key: "userrole",
    icon: renderIcon(PersonIcon),
  },{
    label: "角色权限管理",
    key: "roleAuthority",
    icon: renderIcon(PersonIcon),
  },
  {
    label: "角色信息管理",
    key: "roleManage",
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
const activeKey = ref("user");
watch(activeKey, () => {
  router.push({ path: activeKey.value });
});
onMounted(() => {
  if (typeof route.name === "string") activeKey.value = route.name;
});
</script>

<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <div class="overflow-x-hidden">
          <GlobalLogo
            :open="collapsed"
            logosize="40px"
            textcss="text-xl ml-2"
          ></GlobalLogo>
        </div>
        <n-menu
          :collapsed="collapsed"
          v-model:value="activeKey"
          :collapsed-width="64"
          :collapsed-icon-size="30"
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <div>
          <n-switch v-model:value="collapsed" />
        </div>
        <span><router-view></router-view></span>
      </n-layout>
    </n-layout>
  </n-space>
</template>
