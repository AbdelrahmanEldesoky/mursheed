<script setup>
import {FilterMatchMode} from 'primevue/api'
import {ref, onMounted, onBeforeMount} from 'vue'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
// import ProductService from '@/service/ProductService';
import {useToast} from 'primevue/usetoast'
import axios from "axios";
import {useRouter} from "vue-router";
import {compareStrings} from '../../../../data/maps/lineMapData';

const toast = useToast()
const router = useRouter()

const products = ref(null)
const elements = ref(null)
const cost = ref("null")

const langSelected = ref('gb')
const loading = ref(true)
const user = ref({})
const country = ref({})
const elememnts = ref(null)
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

// const productService = new ProductService();

onBeforeMount(() => {
  initFilters()
})

const fetchData = () => {


  axios.get("/api/orders").then((res) => {
    loading.value = false
    elements.value = res.data.orders

  });


}

onMounted(() => {
  // productService.getProducts().then((data) => (products.value = data));
    fetchData()
    setTimeout(()=>{
      window.print()
    },1500)


})
const formatCurrency = (value) => {
  return value.toLocaleString('gb-US', {style: 'currency', currency: 'USD'})
}
const koko = () => {
  console.log(langSelected.value)
}

const openNew = () => {
  router.push({name: 'offer-create'})
}
const getSeverity = (product) => {


  switch (product.status) {

     case 1:
      return 'warning';
      case 2:
      return 'success';
     case 3:
      return 'primary';
     case 4:
      return 'danger';
      case 5:
      return 'info';
      case 6:
      return 'secondary';
    default:
      return null;
  }
};
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
      .post(`/api/accommodition/${accommodition.value.id}/update`, user.value)
      .then((res) => {
        console.log(res.data)
        fetchData()
        toast.add({severity: 'success', summary: 'Successful', detail: 'user updated', life: 3000})
      })
      .catch(() => {
      })
    toast.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000})
  } else {
    axios
      .post('/api/users/create', user.value)
      .then((res) => {
        console.log(res.data)
        fetchData()
        toast.add({severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000})
      })
      .catch(() => {
      })

  }
  productDialog.value = false
  user.value = {}
}

const edit = (id) => {
  productDialog.value = !(productDialog.value)
  axios.get(`/api/orders/${id}`).then((res) => {
    user.value = res.data.order
    country.value = res.data.country_price

    cost.value = res.data.total_cost
    console.log(cost.value)

  });


  console.log(id)

}

const confirmDelete = (edit) => {
  user.value = edit
  deleteDialog.value = true
}

const deleteAction = () => {
  loading.value = true;
  axios
    .delete(`/api/offers/${user.value.id}/delete`)
    .then((res) => {

      console.log(res.data)
      deleteDialog.value = false
      fetchData()
      loading.value = false
      toast.add({severity: 'success', summary: 'Successful', detail: 'offer deleted', life: 3000})
    })
    .catch(() => {
    })

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
  <div class="grid p-[2%]">
    <div class="col-12">
      <div class="w-full" ><img class="m-auto" src="../../../../assets/dark_mursheed.png"></div>
      <div class="w-full m-auto"><p class="text-3xl font-bold m-auto  py-[1%] ">orders details</p></div>







        <DataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :value="elements"
          :loading="loading"

         class="py-[2%]"

        >



          <Column field="id" header="id"  header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data?.id }}
            </template>
          </Column>


          <Column field="vendor" header="vendor"  header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data?.vendor }}
            </template>
          </Column>


          <Column field="tourist" header="tourist"  header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data?.tourist_name }}
            </template>
          </Column>
          <Column field="cost" header="cost"  header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data?.cost }}
            </template>
          </Column>

          <Column field="start date" header="start date" header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data?.start_date }}
            </template>
          </Column>

          <Column field="end date" header="end date"  header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">
              {{ slotProps.data?.end_date }}
            </template>
          </Column>

          <Column field="status" header="Status"  header-style="width:14%; min-width:10rem;">
            <template #body="slotProps">

              <Tag :value="slotProps.data.status==1?'pending':slotProps.data.status==2?'approved':slotProps.data.status==3?'rejected':slotProps.data.status==1?'expired ':slotProps.data.status==1?'canceled':'paid'"
                   :severity="getSeverity(slotProps.data)"/>

            </template>01
          </Column>



        </DataTable>
        <Dialog
          v-model:visible="productDialog"
          :style="{ width: '570px' }"
          header="order details"
          :modal="true"
          class="p-fluid"
        >


          <div class="">
            <div v-for="(use,index) in user" class="card ">
              <Accordion :activeIndex="1">
                <AccordionTab>
                  <template #header>
                    <p class="px-1">Day</p>
                    <span>{{ index+1 }}</span>
                    <svg width="34px" height="30px" viewBox="0 0 24 24" fill="#6C757D"
                         xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <rect width="24" height="24" fill="white"></rect>
                        <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#6C757D" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                      </g>
                    </svg>
                    <p>{{ use.date }}</p>
                  </template>
                  <div class="flex justify-between">
                    <div class="flex ">
                      <h2 class="text-lg my-auto">city</h2>
                      <p class="my-auto text-[black] text-xl px-1">:</p>
                      <p class="my-auto">{{ use.state }}</p></div>
                    <div class="flex">
                      <h2 class="text-lg">price</h2>
                      <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <rect width="24" height="24" fill="white"></rect>
                          <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </g>
                      </svg>
                      <p class="my-auto">{{ use.price_city }} $</p></div>
                    <div class="flex" v-if="use.routing !=0">
                      <h2 class="text-lg">routing</h2>
                      <svg width="34px" height="34px" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <rect width="24" height="24" fill="white"></rect>
                          <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </g>
                      </svg>
                      <p class="my-auto">{{ use.routing }} $</p></div>
                  </div>
                </AccordionTab>
              </Accordion>
            </div>

            <div><p class="text-xl font-bold text-[black] py-2">Invoice information</p></div>
            <div class="flex">
              <h2 class="text-xl">Fees </h2>
              <svg width="54px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="24" height="24" fill="white"></rect>
                  <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </g>
              </svg>
              <p class="my-auto ">{{ country.fees }} %</p>
            </div>
            <div class="flex">
              <h2 class="text-xl">Tax </h2>
              <svg width="54px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="24" height="24" fill="white"></rect>
                  <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </g>
              </svg>
              <p class="my-auto ">{{ country.tax }} %</p>
            </div>
            <div class="flex">
              <h2 class="text-xl">Total price </h2>
              <svg width="54px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="24" height="24" fill="white"></rect>
                  <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </g>
              </svg>
              <p class="my-auto ">{{ country.price }} $</p>
            </div>
            <div class="flex">
              <h2 class="text-xl ">Total cost </h2>
              <svg width="54px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="24" height="24" fill="white"></rect>
                  <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </g>
              </svg>
              <p class="my-auto ">{{ cost }} $</p>
            </div>


          </div>

        </Dialog>



    </div>
  </div>
</template>

<style scoped lang="scss"></style>
