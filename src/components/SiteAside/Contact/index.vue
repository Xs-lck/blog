<template>
  <ul class="contact-container">
    <li>
      <a :href="dataRef?.github" target="_blank">
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>{{ dataRef?.githubName || '加载中...' }}</span>
      </a>
    </li>
    <li>
      <a href="">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>{{ dataRef?.mail || '加载中...' }}</span>
      </a>
    </li>
    <li>
      <a href="">
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>{{ dataRef?.qq || '加载中...' }}</span>
      </a>
      <div class="pop">
        <img :src="dataRef?.qqQrCode" alt="" />
      </div>
    </li>
    <li>
      <a href="">
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>{{ dataRef?.weixin || '加载中...' }}</span>
      </a>
      <div class="pop">
        <img :src="dataRef?.weixinQrCode" alt="" />
      </div>
    </li>
    <span class="icp">{{ dataRef?.icp }}</span>
  </ul>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/index.vue';
import { useSetStore } from '@/stores/setting';
import { storeToRefs } from 'pinia';
const setStore = useSetStore();
const { dataRef } = storeToRefs(setStore);
const { fetchData } = setStore;
fetchData();
</script>

<style scoped lang="less">
@import '~@/style/global.less';
@import '~@/style/var.less';
.contact-container {
  list-style: none;
  margin: 0;
  padding: 20px;
  color: @gray;
  @heightStyle: 30px;
  li {
    height: @heightStyle;
    line-height: @heightStyle;
    margin: 14px 0;
    cursor: pointer;
    position: relative;
    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
    a {
      display: flex;
      align-items: center;
      span {
        margin-left: 10px;
      }
      .icon {
        font-size: 26px;
        min-width: 34px;
        &.weixin {
          font-size: 32px;
          text-indent: -3px;
        }
      }
    }
    .pop {
      position: absolute;
      left: 0;
      bottom: @heightStyle + 5px;
      transform: scaleY(0);
      transform-origin: bottom;
      transition: all 0.4s;
      img {
        width: 150px;
        height: 150px;
      }
      padding: 10px 15px;
      background: #fff;
      border-radius: 6px;
      &::after {
        content: '';
        background: #fff;
        width: 10px;
        height: 10px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        bottom: -5px;
      }
    }
  }
  .icp {
    position: absolute;
    bottom: 15px;
    left: 35px;
    font-size: 15px;
  }
}
</style>
