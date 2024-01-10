<template>

    <va-card class="card">
      <div class=" flex justify-center">
        <form @submit.prevent="onSubmit" class="flex flex-col  w-3/4 py-9">
          <h2 class="pb-4 text-center va-text-bold">
            create category
            <Dropdown v-model="langSelected" editable :options="lang" optionLabel="name" option-value="value"
                      class=" w-28 mx-3 mx-10"/>

          </h2>
          <div class="">
            <label for="password">name </label>
            <InputText v-model="flight.name" type="text" class="mt-3 w-full mb-3"/>
            <div class="mt-1 mb-5 text-red-500" v-if="error?.name">{{error.name[0]}}</div>
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


  import vueFilePond from "vue-filepond";

  // Import FilePond styles


  // Import image preview and file type validation plugins
  import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
  import FilePondPluginImagePreview from "filepond-plugin-image-preview";

  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
  );

  const toast = useToast()

  const flight = ref({
    name: '',



  })


  const entred = ref(0)
  const file = ref('')
  const url = ref('')
  const urlurl = ref('')
  const dataEntred = ref({})
  const error = ref('')

  const totalSize = ref(0);
  const myFiles = ref([]);
  const totalSizePercent = ref(0);
  const files = ref([]);

  const pond = ref(null)

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

    files.value = e.files
    file.value = e.files[0]
    console.log(file.value)
    url.value = URL.createObjectURL(file.value);
  };

  const onSubmit = () => {
    // console.log(pond.value.getFiles())
    // console.log(myFiles.value)
    //
    // console.log(files.value)

    const body = new FormData();


    body.append("name", flight.value.name);

    if (!entred.value) {
      axios.defaults.headers.common['local'] = langSelected.value
      console.log(files.value[0])


      axios.post('/api/accommodition_category/create', body).then((res) => {
        error.value=[]
        entred.value = 1
        dataEntred.value = res.data.flight
        console.log(dataEntred.value)
        toast.add({severity: 'success', summary: 'Successful', detail: 'category Created', life: 3000})

      }).catch((el)=>{
        error.value = el.response.data.errors

        console.log(error.value)

      })



    } else {
      axios.defaults.headers.common['local'] = langSelected.value

      axios.post(`/api/accommodition_category/${dataEntred.value.id}/update`, body).then((res) => {
        error.value=[]

        entred.value = 1
        dataEntred.value = res.data.flight
        toast.add({severity: 'success', summary: 'Successful', detail: 'Flight Created', life: 3000})

      }).catch((el)=>{
        error.value = el.response.data.errors

        console.log(error.value)

      })

    }

  }


  watch(langSelected, async (newValue, oldQuestion) => {
    console.log(dataEntred.value)
    if (entred.value) {

      flight.value.name = dataEntred.value?.name[newValue] == undefined ? '':dataEntred.value?.name[newValue];

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
