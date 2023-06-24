<template>
  <div class="vaw-avatar-container">
    <n-dropdown
      trigger="hover"
      :options="options"
      size="small"
      @select="handleSelect"
    >
      <div class="action-wrapper">
        <span class="nick-name">
          {{ userStore.nickName }}
        </span>
      </div>
    </n-dropdown>
    <Setting ref="settingRef" />
  </div>
</template>

<script lang="ts">
import { NIcon, useDialog } from "naive-ui";
import { defineComponent, h, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "VAWAvatar",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const options = [
      {
        label: "个人中心",
        key: "personal-center",
      },
      {
        label: "退出登录",
        key: "logout",
      },
      {
        label: "主题",
        key: "theme",
      },
    ];
    function personalCenter() {
      router.push("/personal/info");
    }
    const dialog = useDialog();
    function logout() {
      dialog.warning({
        title: "提示",
        content: "是否要退出当前账号？",
        positiveText: "退出",
        negativeText: "再想想",
        onPositiveClick: () => {
          userStore.logout().then(() => {
            window.location.reload();
          });
        },
      });
    }
    function handleSelect(key: string) {
      switch (key) {
        case "personal-center":
          personalCenter();
          break;
        case "logout":
          logout();
          break;
        case "theme":
        settingRef.value.openDrawer()
          break;
      }
    }
    const settingRef = ref();
    return {
      userStore,
      options,
      handleSelect,
      settingRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.vaw-avatar-container {
  .action-wrapper {
    display: flex;
    align-items: center;
    .avatar {
      width: calc(#{$logoHeight} - 15px);
      height: calc(#{$logoHeight} - 15px);
      display: flex;
      align-items: center;
      & > img {
        border: 1px solid #f6f6f6;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .nick-name {
      margin: 0 5px;
      .tip {
        transform: rotate(0);
        transition: transform $transitionTime;
        margin-left: 2px;
      }
    }
  }
}
.vaw-avatar-container:hover {
  cursor: pointer;
  color: var(--primary-color);
  .nick-name .tip {
    transform: rotate(180deg);
    transition: transform $transitionTime;
  }
}
</style>
