<script setup>
import {useToast} from 'primevue/usetoast'
import { FilterMatchMode } from 'primevue/api'
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from "axios";
const countries = ref([])
const toast = useToast()
const price_id =ref(null)
const products = ref(null)
const loading = ref(true)
const user = ref({})
const arr=ref([])
const error = ref('')
const users = ref(null)
const productDialog = ref(false)
const deleteDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref(null)
const dt = ref(null)
const filters = ref({})
const submitted = ref(false)
const statuses = ref([
  {label: 'INSTOCK', value: 'instock'},
  {label: 'LOWSTOCK', value: 'lowstock'},
  {label: 'OUTOFSTOCK', value: 'outofstock'},
])
const status = true
const lang = ref([
  {name: 'en', value: "gb"},
  {name: 'ar', value: "sa"},
  {name: 'az', value: "az"},
  {name: 'ge', value: "ge"},
  {name: 'ru', value: "ru"},
  {name: 'tr', value: "tr"},
])
const getSeverity = (product) => {
  switch (product.status) {
    case 1:
      return 'success';
    case -1:
      return 'warning';
    case 0:
      return 'danger';
    default:
      return null;
  }
};
const onSubmit = () => {
  const body = new FormData();
  for(let i=0; i<files.value.length; i++){
    body.append('images[]', files.value[i])
  }
  // body.append("images", file.value);
  body.append("number",offer.value.number);
  body.append("title",offer.value.title);
  body.append("status",offer.value.status);
  body.append("price",offer.value.price);
  if (!entred.value) {
    axios.defaults.headers.common['local'] = langSelected.value
    axios.post('/api/offers/create', body).then((res) => {
      error.value=[]
      entred.value = 1
      dataEntred.value = res.data.offer
      console.log(dataEntred.value)
      toast.add({severity: 'success', summary: 'Successful', detail: 'Offer Created', life: 3000})
    }).catch((el)=>{
      error.value = el.response.data.errors
      console.log(error.value)
    })
  } else {
    axios.defaults.headers.common['local'] = langSelected.value
    axios.post(`/api/offers/${dataEntred.value.id}/update`, body).then((res) => {
      error.value=[]
      entred.value = 1
      dataEntred.value = res.data.offer
      toast.add({severity: 'success', summary: 'Successful', detail: 'Offer Created', life: 3000})
    }).catch((el)=>{
      error.value = el.response.data.errors
      console.log(error.value)
    })
  }
}
const initFilters = () => {
  filters.value = {
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  }
}
onBeforeMount(() => {
  initFilters()
})


const country =()=>{
  axios.get(`/api/countries`).then((res) => {

    countries.value = res.data.countries.filter(c =>  !arr.value.includes(c.country_id))
    console.log(countries.value)
  })
}
const fetchData= ()=>{
  axios.get("/api/country-price").then((res)=>{
    loading.value= false
    for(var i=0; i< res.data.prices.length; i++){
      arr.value.push(res.data.prices[i].country_id)
    }

    console.log(arr.value)
    users.value= res.data.prices
    console.log(users.value)
  });
}
onMounted(() => {
  // productService.getProducts().then((data) => (products.value = data));

  fetchData()
  country()
})
const formatCurrency = (value) => {
  return value.toLocaleString('gb-US', {style: 'currency', currency: 'USD'})
}
const openNew = () => {
  user.value = ref({})
  error.value = ref('')
  product.value = {}
  submitted.value = false
  productDialog.value = true
}
const createprice =()=>{
  axios
    .post('/api/country-price/create',user.value)
    .then((res) => {
      console.log(res.data)
      fetchData()
      country()

      productDialog.value=!(productDialog.value)
      toast.add({severity: 'success', summary: 'Successful', detail: 'price Created', life: 3000})
      user.value = ref({})
    })
    .catch((el)=>{
      error.value = el.response.data.errors
    })
}
const deleteprice = ()=>{
  console.log(price_id.value)
  axios.post(`/api/country-price/${price_id.value}/update`,user.value).then((res) => {
    fetchData()
    deleteDialog.value =!(deleteDialog.value)
    toast.add({severity: 'success', summary: 'Successful', detail: 'update Created', life: 3000})
    user.value = ref({})
  }).catch((el)=>{
    error.value = el.response.data.errors
    console.log(error.value)
  })
}
const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}
const save = () => {
  submitted.value = true
  if (!user.value.first_name || !user.value.last_name || !user.value.email || !user.value.mobile_number)
    return
  if (user.value.id) {
    axios
      .post(`/api/users/${id.value}/update`,user.value)
      .then((res) => {
        console.log(res.data)
        fetchData()
        toast.add({severity: 'success', summary: 'Successful', detail: 'user updated', life: 3000})
      })
      .catch(() => {})
    toast.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000})
  } else {
    axios
      .post('/api/users/create',user.value)
      .then((res) => {
        console.log(res.data)
        fetchData()
        toast.add({severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000})
      })
      .catch(() => {})
  }
  productDialog.value = false
  user.value = {}
}
const edit = (edit) => {
  user.value = {...edit}
  productDialog.value = true
}
const confirmDelete = (id) => {
  price_id.value=id
  error.value=ref('')
  axios.get(`/api/country-price/${price_id.value}`).then((res) => {
    console.log(res)
    user.value=res.data.user
    toast.add({severity: 'success', summary: 'Successful', detail: 'price get', life: 3000})
  })
  deleteDialog.value = true
}
const deleteAction = () => {
  axios
    .delete(`/api/users/${user.value.id}/delete`)
    .then((res) => {
      console.log(res.data)
      deleteDialog.value=false
      fetchData()
      toast.add({severity: 'success', summary: 'Successful', detail: 'user deleted', life: 3000})
    })
    .catch(() => {})
}
const createprices = () =>{
  axios.post(`/api/country-price/1/update`).then((res) => {
    error.value=[]
    // entred.value = 1
    // dataEntred.value = res.data.offer
    // console.log(dataEntred.value)
    toast.add({severity: 'success', summary: 'Successful', detail: 'Offer Created', life: 3000})
  }).catch((el)=>{
    error.value = el.response.data.errors
    console.log(error.value)
  })
}
const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>
<template>
  <div class="grid">
    <div class="col-12">
      <va-card class="card">
        <Toolbar class="mb-4">
          <template #start>
            <div class="my-2">
              <Button label="New" icon="pi pi-plus" class="new mr-2" @click="openNew"/>
              <!--              <Button-->
              <!--                label="Delete"-->
              <!--                icon="pi pi-trash"-->
              <!--                class="p-button-danger"-->
              <!--                :disabled="!selectedProducts || !selectedProducts.length"-->
              <!--                @click="confirmDeleteSelected"-->
              <!--              />-->
            </div>
          </template>
        </Toolbar>
        <Toast/>
        <DataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :value="users"
          :loading="loading"
          data-key="id"
          :paginator="true"
          :rows="10"
          :filters="filters"
          paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rows-per-page-options="[5, 10, 25]"
          current-page-report-template="Showing {first} to {last} of {totalRecords} products"
          responsive-layout="scroll"
        >
          <template #header>
            <div class="flex flex-column md:flex-row md:justify-between md:align-items-center">
              <h5 class="m-0">country price </h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Search..."/>
              </span>
            </div>
          </template>
          <Column selection-mode="multiple" header-style="width: 3rem"></Column>
          <Column field="country_name" header="country_name" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.country_name }}
            </template>
          </Column>
          <Column field="price" header="price" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.price }}
            </template>
          </Column>
          <Column field="fees" header="fees" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.fees }}
            </template>
          </Column>
          <Column field="tax" header="tax" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.tax }}
            </template>
          </Column>
          <Column field="status" header="Status" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <Tag :value="slotProps.data.status==1?'Active':slotProps.data.status==0?'In Active':'pending'" :severity="getSeverity(slotProps.data)" />
            </template>
          </Column>
          <!--          <Column header="Image" header-style="width:14%; min-width:10rem;">-->
          <!--            <template #body="slotProps">-->
          <!--              <span class="p-column-title">Image</span>-->
          <!--              <img-->
          <!--                :src="'demo/images/product/' + slotProps.data.image"-->
          <!--                :alt="slotProps.data.image"-->
          <!--                class="shadow-2"-->
          <!--                width="100"-->
          <!--              />-->
          <!--            </template>-->
          <!--          </Column>-->
          <Column header-style="min-width:10rem;">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="confirmDelete(slotProps.data.id)"
              />
            </template>
          </Column>
        </DataTable>
        <Dialog
          v-model:visible="productDialog"
          :style="{ width: '450px' }"
          header="create price"
          :modal="true"
          class="p-fluid"
        >
          <div class=" mb-5 pr-12 ">
            <label class=" w-full"> country </label>
            <Dropdown v-model="user.country_id" editable :options="countries" optionLabel="country"
                      option-value="country_id"
                      class=" w-full my-2 "/>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.country_id">{{ error.country_id[0] }}</div>
          </div>
          <div class="field mb-5">
            <label for="first">price </label>
            <div class="flex">
              <InputNumber
                :min="0" :max="100"
                class="mt-3"
                id="first"
                v-model="user.price"
                required="true"
                autofocus
              />
              <div class="text-xl my-auto px-2">/KM</div>
            </div>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.price">{{ error.price[0] }}</div>
          </div>
          <div class="field mb-5">
            <label for="first">fees </label>
            <div class="flex w-full">
              <InputNumber
                :min="0" :max="100"
                class="mt-3"
                id="first"
                v-model="user.fees"
                required="true"
                autofocus
              />
              <div class="text-xl my-auto px-4">%</div>
            </div>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.fees">{{ error.fees[0] }}</div>
          </div>
          <div class="field mb-5">
            <label for="first">tax </label>
            <div class="flex">
              <InputNumber
                :min="0" :max="100"
                class="mt-3"
                id="first"
                v-model="user.tax"
                required="true"
                autofocus
              />
              <div class="text-xl my-auto px-4">%</div>
            </div>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.tax">{{ error.tax[0] }}</div>
          </div>
          <div class=" flex  mt-4 mb-6">
          </div>
          <div class="w-full pr-12"> <Button label="create"  class="w-full m-auto" @click="createprice"/></div>
        </Dialog>
        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="update" :modal="true">
          <div class=" mb-5 pr-12 ">
            <label class=" w-full"> country </label>
            <Dropdown v-model="user.country_id" editable :options="countries" optionLabel="country"
                      option-value="country_id"
                      class=" w-full my-2 "/>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.country_id">{{ error.country_id[0] }}</div>
          </div>
          <div class="field mb-5 w-full">
            <label for="first">price </label>
            <div class="flex w-full">
              <InputNumber type="Number"
                           :min="0" :max="100"
                           class="mt-3 w-full"
                           id="first"
                           v-model="user.price"
                           required="true"
                           autofocus
                           :class="{ 'p-invalid': submitted && !user.price }"
              />
              <div class="text-xl my-auto px-4">/KM</div>
            </div>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.price">{{ error.price[0] }}</div>
          </div>
          <div class="field mb-5">
            <label for="first">fees </label>
            <div class="flex">
              <InputNumber
                :min="0" :max="100"
                class="mt-3 w-full"
                id="first"
                v-model="user.fees"
                required="true"
                autofocus
                :class="{ 'p-invalid': submitted && !user.fees }"
              />
              <div class="text-xl my-auto px-4">%</div>
            </div>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.fees">{{ error.fees[0] }}</div>
          </div>
          <div class="field mb-5">
            <label for="first">tax </label>
            <div class="flex w-full">
              <InputNumber
                :min="0" :max="100"
                class="mt-3 w-full"
                id="first"
                v-model="user.tax"
                required="true"
                autofocus
                :class="{ 'p-invalid': submitted && !user.tax }"
              />
              <div class="text-xl my-auto px-4">%</div>
            </div>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.tax">{{ error.tax[0] }}</div>
          </div>
          <div class=" flex  mt-4 mb-6">
          </div>




          <div class="w-full pr-12"> <Button label="update Price"  class="w-full m-auto" @click="deleteprice"/></div>
        </Dialog>
      </va-card>
    </div>
  </div>

</template>
<style scoped lang="scss"></style>
