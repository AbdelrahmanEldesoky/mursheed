<template>

  <va-card class="card">
    <div class=" flex justify-center">
      <form @submit.prevent="onSubmit" class="flex flex-col  w-3/4 py-9">
       <div class="w-full flex justify-between">
         <h2 class=" text-xl font-bold">
          Create Offer
        </h2>
          <Dropdown v-model="langSelected" editable :options="lang" optionLabel="name" option-value="value"
                    class=" w-28 mx-3 "/>
        </div>

        <div class="">
          <label for="password">Offer Number </label>
          <InputNumber v-model="offer.number" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.number">{{error.number[0]}}</div>


        </div>

        <div class="">
          <label for="password">Title </label>
          <InputText v-model="offer.title" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.title">{{error.title[0]}}</div>

        </div>

        <div class="">
          <label for="password">price </label>
          <InputNumber v-model="offer.price" type="text" class="mt-3 w-full mb-3"/>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.price">{{error.price[0]}}</div>

        </div>


        <div>
          <FileUpload id="password" @uploader="handleFileUpload" accept="image/*" required="true" multiple="true"
                      :custom-upload="true" autofocus >
            <template #empty>

              <img v-if="file.value != ''" v-for="u in url " :src="u" class="w-[200px] h-[90px]  mb-3"  >

              <img v-else-if="dataEntred?.media?.length" v-for="data in dataEntred?.media" :src="data.original_url" class="w-[200px] h-[90px] mb-3">
            </template>
          </FileUpload>
          <div class="mt-1 mb-5 text-red-500" v-if="error?.images">{{error.images[0]}}</div>


        </div>


        <div class=" flex  mt-4">
          <div class="flex items-center">
            <label class="mx-2"> status </label>
            <InputSwitch v-model="offer.status"/>
          </div>

        </div>



        <Button type="submit" label="Submit" class="mt-3"/>
      </form>

    </div>
    <Toast/>
  </va-card>
</template>

<script setup>
import {useToast} from 'primevue/usetoast'
import axios from "axios";
import {ref, watch} from "vue";


const toast = useToast()

const offer = ref({
  number: '',
  title: '',
  status: true,
  price: '',


})


const entred = ref(0)
const file = ref('')
const url = ref([])
const dataEntred = ref({})
const error = ref('')

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const lang = ref([
  {name: 'en', value: "gb"},
  {name: 'ar', value: "sa"},
  {name: 'az', value: "az"},
  {name: 'ge', value: "ge"},
  {name: 'ru', value: "ru"},
  {name: 'tr', value: "tr"},
])


const langSelected = ref('gb')


const handleFileUpload = (e) => {
  console.log(e.files[0])
  files.value = e.files;
  file.value = e.files;

  for (let  i =0 ;i < files.value.length ; i++)
  {
    // console.log(URL.createObjectURL(files.value[i]))
    url.value.push(URL.createObjectURL(files.value[i])) ;
  }
  console.log(url.value)

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


watch(langSelected, async (newValue, oldQuestion) => {
  console.log(dataEntred.value)
  if (entred.value) {

    offer.value.title = dataEntred.value?.title[newValue]== undefined ? '' :dataEntred.value?.title[newValue]

  }
})



const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
  files.value = event.files;
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
  });
  console.log(files.value)
};

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  toast.add({severity: "info", summary: "Success", detail: "File Uploaded", life: 3000});
};


function imageUrl(file) {
  console.log(file)
  return URL.createObjectURL(file)
}

const formatSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

</script>

<style scoped>

</style>
