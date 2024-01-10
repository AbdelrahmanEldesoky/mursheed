<script setup>
import {FilterMatchMode} from 'primevue/api'
import {ref, onMounted, onBeforeMount} from 'vue'
// import ProductService from '@/service/ProductService';
import {useToast} from 'primevue/usetoast'
import axios from "axios";
import {useRouter} from "vue-router";
const toast = useToast()
const router = useRouter()
const products = ref(null)
const loading = ref(true)
const user = ref({})
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
const rate = ref({
    tourist_rating:Number,
    reviewable_id:'',
    type:1
})
const statuses = ref([
  {label: 'INSTOCK', value: 'instock'},
  {label: 'LOWSTOCK', value: 'lowstock'},
  {label: 'OUTOFSTOCK', value: 'outofstock'},
])

// const productService = new ProductService();

onBeforeMount(() => {
  initFilters()
})

 const fetchData= ()=>{


  axios.get("/api/guides").then((res)=>{
    loading.value= false
    users.value= res.data.guides
    console.log(users.value)

  });


}
const active= (data)=>{
  loading.value=true;

  axios.post(`/api/guides/${data.id}/active`).then((res)=>{
    fetchData()
  });
}
const inActive= (data)=>{
  loading.value=true;

  axios.post(`/api/guides/${data.id}/inActive`).then((res)=>{
    fetchData()
  });
}
const changeStatus= (data)=>{
  loading.value=true;
  axios.post(`/api/guides/${data.id}/changeStatus`).then((res)=>{
    fetchData()
  });
}

onMounted(() => {
  // productService.getProducts().then((data) => (products.value = data));
fetchData()

})
const formatCurrency = (value) => {
  return value.toLocaleString('gb-US', {style: 'currency', currency: 'USD'})
}

const openNew = () => {
  product.value = {}
  submitted.value = false
  productDialog.value = true
}
const show = (id) => {
  router.push({name:'guides-show',params:{'id':id} })
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
        .post(`/api/users/${user.value.id}/update`,user.value)
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

const confirmDelete = (id) => {

  error.value = ref('')
  rate.value.reviewable_id=id
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

const findIndexById = (id) => {
  let index = -1
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i
      break
    }
  }
  return index
}
const rateValue = () => {


axios.post(`/api/rating/create-admin`,rate.value).then((res) => {

  fetchData()
  toast.add({ severity: 'success', summary: 'Successful', detail: 'rate send', life: 3000 })
  deleteDialog.value= !(deleteDialog.value)

}).catch((el)=>{
  error.value = el.response.data.errors
})
}

const createId = () => {
  let id = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

const exportCSV = () => {
  dt.value.exportCSV()
}

const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}
const deleteSelectedProducts = () => {
  products.value = products.value.filter((val) => !selectedProducts.value.includes(val))
  deleteProductsDialog.value = false
  selectedProducts.value = null
  toast.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000})
}

const initFilters = () => {
  filters.value = {
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  }
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <va-card class="card">
        <Toolbar class="mb-4">
          <template #start>
            <div class="my-2">
<!--              <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew"/>-->
<!--              <Button-->
<!--                label="Delete"-->
<!--                icon="pi pi-trash"-->
<!--                class="p-button-danger"-->
<!--                :disabled="!selectedProducts || !selectedProducts.length"-->
<!--                @click="confirmDeleteSelected"-->
<!--              />-->
            </div>
          </template>

          <template #end>
<!--            <FileUpload-->
<!--              mode="basic"-->
<!--              accept="image/*"-->
<!--              :max-file-size="1000000"-->
<!--              label="Import"-->
<!--              choose-label="Import"-->
<!--              class="mr-2 inline-block"-->
<!--            />-->
            <Button label="Export" icon="pi pi-upload" class="new" @click="exportCSV($event)"/>
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
              <h5 class="m-0">Manage guides</h5>
              <span class="block mt-2 md:mt-0 p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText v-model="filters['global'].value" placeholder="Search..."/>
              </span>
            </div>
          </template>

          <Column selection-mode="multiple" header-style="width: 3rem"></Column>
          <Column field="name" header="name" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>

          <Column field="gender" header="Gender" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <span v-if="slotProps.data.gender==1">
                Men
              </span>
              <span v-else>
                Women
              </span>
            </template>
          </Column>
           <Column field="email" header="Email" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>
           <Column field="phone" header="Phone" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data.phone }}
            </template>
           </Column>


           <Column field="rate" header="rate" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              <Rating @click="confirmDelete(slotProps.data.id)" :modelValue="slotProps.data.admin_rating"  :cancel="false" />
            </template>
          </Column>

          <Column field="status" header="Status" :sortable="true" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">

              <Tag :value="slotProps.data.status==1?'Active':slotProps.data.status==0?'In Active':'pending'" :severity="getSeverity(slotProps.data)" />

            </template>
          </Column>

          <Column header-style="min-width:10rem;">
            <template #body="slotProps">
              <div v-if="slotProps.data.status == -1 ">
                <Button
                        :icon="'pi pi-times'"
                        class="p-button-rounded  mr-2"
                        :class=" 'p-button-danger'"
                        @click="inActive(slotProps.data)"/>
                <Button
                        :icon="'pi pi-check'"
                        class="p-button-rounded  mr-2"
                        :class=" 'p-button-success' "
                        @click="active(slotProps.data)"/>
              </div>
              <div v-else>
                <Button
                        :icon="slotProps.data.status == 0  ? 'pi pi-check':'pi pi-times'"
                        class="p-button-rounded  mr-2"
                        :class="slotProps.data.status == 0 ? 'p-button-success' : 'p-button-danger'"
                        @click="changeStatus(slotProps.data)"/>
              </div>




            </template>
          </Column>
          <Column header-style="min-width:10rem;">
            <template #body="slotProps">
              <div >
                <Button

                        label="show"
                        class="pop  mr-2"
                        :class=" 'p-button-danger'"
                        @click="show(slotProps.data.id)"/>
              </div>
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

        </DataTable>

        <Dialog
          v-model:visible="productDialog"
          :style="{ width: '450px' }"
          header="users form"
          :modal="true"
          class="p-fluid"
        >

          <div class="field mb-5">
            <label for="first">first name </label>
            <InputText
              class="mt-3"
              id="first"
              v-model.trim="user.first_name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.first_name }"
            />
            <small v-if="submitted && !user.first_name" class="p-invalid">First Name is required.</small>
          </div>

          <div class="field mb-5">
            <label for="last">last name </label>
            <InputText
              class="mt-3"
              id="last"
              v-model.trim="user.last_name"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.last_name }"
            />
            <small v-if="submitted && !user.last_name" class="p-invalid">Last Name is required.</small>
          </div>

          <div class="field mb-5">
            <label for="email" class="mb-3">email </label>
            <InputText
              class="mt-3"
              id="email"
              v-model.trim="user.email"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.email }"
            />
            <small v-if="submitted && !user.email" class="p-invalid">Email is required.</small>
          </div>

          <div class="field mb-5">
            <label for="password" class="mb-3">password </label>
            <InputText
              class="mt-3"
              id="password"
              v-model.trim="user.password"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.password }"
            />
            <small v-if="submitted && !user.password" class="p-invalid">password is required.</small>
          </div>

          <div class="field mb-5">
            <label for="mobile" class="mb-3">mobile</label>
            <InputText
              class="mt-3"
              id="mobile"
              v-model.trim="user.mobile_number"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !user.mobile_number }"
            />
            <small v-if="submitted && !user.mobile_number" class="p-invalid">mobile is required.</small>
          </div>


          <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="save"/>
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
          <div class="m-auto">
                 <Rating class="m-auto" v-model="rate.tourist_rating" :stars="5" :cancel="false" />
              </div>

          <template #footer>
            <Button label="send" icon="pi pi-check" class="m-auto" @click="rateValue" />
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
            <span v-if="product">Are you sure you want to delete the selected products?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
            <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts"/>
          </template>
        </Dialog>
      </va-card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
