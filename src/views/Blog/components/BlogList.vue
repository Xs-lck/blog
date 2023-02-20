<template>
  <div class="blogList-container" ref="blogList" v-loading="isLoadingRef">
    <ul>
      <li v-for="item in dataRef?.rows" :key="item.id">
        <div class="img-container" v-if="item.thumb">
          <Router-link :to="{ name: 'BlogDetail', params: { id: item.id } }">
            <img v-lazy="{ src: item.thumb, proxy }" :alt="item.title" />
          </Router-link>
        </div>
        <div class="main-container">
          <div class="title">
            <Router-link :to="{ name: 'BlogDetail', params: { id: item.id } }">
              <h1>{{ item.title }}</h1>
            </Router-link>
          </div>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览量:{{ item.scanNumber }}</span>
            <span>评论数：{{ item.commentNumber }}</span>
            <Router-link
              :to="{
                name: 'BlogCategory',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}</Router-link
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Pager
      :current="routeFormat.page"
      :limit="routeFormat.limit"
      :total="dataRef?.total"
      :visiblNumber="10"
      @pageChange="handlePageChange"
      v-if="!isLoadingRef"
    />
    <Empty v-if="dataRef?.rows.length == 0 && !isLoadingRef"></Empty>
  </div>
</template>

<script setup lang="ts">
import Empty from '@/components/Empty/index.vue';
import { useFetchData } from '@/utils/useFetchData';
import { getBlogs } from '@/api/blog';
import { formatDate } from '@/utils';
import Pager from '@/components/Pager/index.vue';
import { useMainScroll } from '@/utils/useMainScroll';
import { useRoute, useRouter } from 'vue-router';
import { computed, watch, ref, onMounted, getCurrentInstance } from 'vue';
import type { blogs } from '@/type/blog';
const { proxy }: any = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const blogList = ref<HTMLElement | null>(null);

onMounted(() => {
  useMainScroll(blogList);
});

const routeFormat = computed(() => {
  const categoryId = (route.params.categoryId as any) || -1;
  const limit = +(route.query.limit as any) || 10;
  const page = +(route.query.page as any) || 1;
  return {
    categoryId,
    limit,
    page,
  };
});
const fetchData = async () => {
  return await getBlogs(
    routeFormat.value.page,
    routeFormat.value.limit,
    routeFormat.value.categoryId
  );
};

const { dataRef, isLoadingRef } = useFetchData<blogs>(fetchData);

watch(
  () => route.query,
  async () => {
    isLoadingRef.value = true;
    (blogList.value as HTMLElement).scrollTop = 0;
    dataRef.value = await fetchData();
    isLoadingRef.value = false;
  }
);

const handlePageChange = (newPage: number) => {
  const query = {
    page: newPage,
    limit: routeFormat.value.limit,
  };
  if (routeFormat.value.categoryId == -1) {
    router.push({
      name: 'Blog',
      query,
    });
  } else {
    router.push({
      name: 'BlogCategory',
      query,
      params: {
        categoryId: routeFormat.value.categoryId,
      },
    });
  }
};
</script>

<style scoped lang="less">
@import '~@/style/var.less';
.blogList-container {
  letter-spacing: 1px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  //   overflow: hidden;
  overflow-y: scroll;
  position: relative;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0 15px;
    li {
      //   width: 100%;
      padding: 15px 0;
      margin: 0 auto;
      //   height: 11%;
      padding-bottom: 20px;
      display: flex;
      border-bottom: 1px solid @gray;
      box-sizing: border-box;
      margin-bottom: 10px;
    }
  }
  a {
    text-decoration: none;
  }
  .img-container {
    flex: 0 0 auto;
    margin-right: 15px;
    position: relative;
    img {
      //   position: absolute;
      //   left: 50%;
      //   top: 50%;
      //   width: 90%;
      //   height: 80%;
      //   transform: translate(-50%, -50%);
      //   object-fit: cover;
      //   border-radius: 5px;
      display: block;
      border-radius: 5px;
      max-width: 200px;
      margin-top: 14px;
    }
  }
  .main-container {
    flex: 1;
    h1 {
      color: @words;
      margin-bottom: 8px;
    }
    .aside {
      color: @gray;
      font-size: 12px;
      margin-bottom: 36px;
      span {
        margin-right: 26px;
      }
    }
    .desc {
      // text-indent: 2em;
      font-size: 14px;
      line-height: 20px;
      line-clamp: 4;
      display: -webkit-box; /*必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
      -webkit-box-orient: vertical; /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 */
      -webkit-line-clamp: 3; /*用来限制在一个块元素显示的文本的行数,非CSS规范*/
      overflow: hidden;
    }
  }
}
// .blogList-container {
//   line-height: 1.7;
//   position: relative;
//   padding: 20px;
//   overflow-y: scroll;
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   scroll-behavior: smooth;
//   ul {
//     list-style: none;
//     margin: 0;
//     padding: 0;
//   }
// }
// li {
//   display: flex;
//   padding: 15px 0;
//   border-bottom: 1px solid @gray;
//   .img-container {
//     flex: 0 0 auto;
//     margin-right: 15px;
//     img {
//       display: block;
//       max-width: 200px;
//       border-radius: 5px;
//     }
//   }
//   .main-container {
//     flex: 1 1 auto;
//     h2 {
//       margin: 0;
//     }
//   }
//   .aside {
//     font-size: 12px;
//     color: @gray;
//     span {
//       margin-right: 15px;
//     }
//   }
//   .desc {
//     margin: 15px 0;
//     font-size: 14px;
//   }
// }
</style>
