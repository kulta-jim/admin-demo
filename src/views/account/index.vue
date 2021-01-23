<template>
  <a-table
    :columns="columns"
    :row-key="(record) => 'record.login.uuid'"
    :data-source="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <a slot="name" slot-scope="name">{{ name }}</a>
    <template></template>
  </a-table>
</template>
<script>
import reqwest from "reqwest";
const columns = [
  {
    title: "Name",
    dataIndex: "username",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "20%",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
  },
  {
    title: "Join Date",
    dataIndex: "date_joined",
  },
  {
    title: "active",
    dataIndex: "is_active",
  },
  {
    title: "url",
    dataIndex: "url",
  },
];
export default {
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      console.log(pagination);
      //   const pager = { ...this.pagination };
      //   pager.current = pagination.current;
      //   this.pagination = pager;
      //   this.fetch({
      //     results: pagination.pageSize,
      //     page: pagination.current,
      //     sortField: sorter.field,
      //     sortOrder: sorter.order,
      //     ...filters,
      //   });
    },
    fetch(
      params = {
        format: "json",
      }
    ) {
      console.log("params:", params);
      this.loading = true;
      reqwest({
        url: "http://localhost:8000/api/v1/account/",
        method: "get",
        data: {
          ...params,
        },
        type: "json",
      }).then((data) => {
        const pagination = { ...this.pagination };
        // Read total count from server
        pagination.total = data.count;
        // pagination.total = 200;
        this.loading = false;
        this.data = data.data;
        this.pagination = pagination;
      });
    },
  },
};
</script>
