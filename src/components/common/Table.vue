<script lang="ts" setup>
const {columns,data}=defineProps<{
    columns:Array<any>,
    data:any
}>()

</script>

<template>
  <n-table>
    <thead>
      <tr>
         <th><input type="checkbox">全选</th>
        <th v-for="(item,i) in columns" :key="i">
          {{ item }}
        </th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,i) in data" :key="i">
        <td><input type="checkbox"></td>
        <td v-for="(it,k) in item" :key="k">{{ it }}</td>
        <td><slot></slot></td>
      </tr>
    </tbody>
  </n-table>
</template>
<style scoped></style>
