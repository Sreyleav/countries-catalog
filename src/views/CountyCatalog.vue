<template>
  <div>
    <v-card tile class="py-5 px-2">
      <h4 style="color: #0999ad">Search Filter</h4>
      <v-row>
        <v-col cols="12" lg="5">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            @input="searchFilter()"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <div class="mt-5">
      <v-card
        class="pa-5 d-flex justify-space-between align-center"
        style="font-weight: 500"
        tile
      >
        <div>
          <div>{{ page * 25 }} of {{ catalogs.length }} Data(s)</div>
          <div>Page: {{ page }}</div>
        </div>
        <div>
          <v-select
            v-model="selected"
            @input="selectFilter()"
            :items="select"
            item-text="state"
            item-value="abbr"
            label="Select"
            persistent-hint
            return-object
            single-line
          ></v-select>
        </div>
      </v-card>
      <v-card
        v-for="(catalog, index) in data"
        :key="index"
        class="pa-5"
        style="margin-top: 1px"
        tile
        hover
      >
        <div class="d-flex">
          <v-avatar tile height="80" width="140" class="mt-2">
            <v-img :src="catalog.flags.png" />
          </v-avatar>
          <div class="ml-4" style="width: 100%">
            <v-card-title class="pa-0">{{
              catalog.name.official
            }}</v-card-title>
            <v-row class="mt-1">
              <v-col cols="12" lg="6" sm="12" class="py-1"
                >2 Character Country Code: "{{ catalog.cca2 }}"
              </v-col>
              <v-col cols="12" lg="6" sm="12" class="py-1"
                >3 Character Country Code: "{{ catalog.cca3 }}"
              </v-col>
              <v-col cols="12" lg="6" sm="12" class="py-1"
                >Native Country Name:
                {{ catalog?.name?.nativeName?.zho?.official ?? "N/A" }}
              </v-col>
              <v-col cols="12" lg="6" sm="12">
                Alternative Country Name:
                <div style="overflow-y: auto; height: 75px">
                  <div
                    style="margin-left: 20px"
                    v-for="(alter, index) in catalog.altSpellings"
                    :key="index"
                  >
                    {{ alter }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12" lg="6" sm="12" class="d-flex">
                <div>Country Calling Code: {{ catalog.idd.root }}</div>
                <span v-if="catalog.idd.suffixes">{{
                  catalog?.idd?.suffixes[0]
                }}</span>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </div>
    <div
      class="px-10 orange--text"
      style="text-align: center"
      v-if="data == '' && get == true"
    >
      No Data
    </div>
    <div class="mt-4">
      <v-pagination
        v-model="page"
        @input="pagination()"
        :length="Math.ceil(catalogs.length / 25.0)"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      catalogs: [],
      page: 1,
      perPage: 25,
      data: [],

      //filter
      select: ["Asc", "Desc"],
      selected: "Asc",
      search: "",
      get: false,
    };
  },

  methods: {
    //get data from API
    getCountryCatalog() {
      this.axios.get(this.$apiURL + "/all").then((res) => {
        this.catalogs = res.data;
        this.data = this.displayedRecords();
        this.get = true;
      });
    },

    //pagination
    displayedRecords() {
      const startIndex = this.perPage * (this.page - 1);
      const endIndex = startIndex + this.perPage;
      return this.catalogs.slice(startIndex, endIndex);
    },

    //get number fom pagination
    pagination() {
      this.data = [];
      this.data = this.displayedRecords();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },

    //filter
    searchFilter() {
      this.page = 1;
      this.axios.get(this.$apiURL + "/name/" + this.search).then((res) => {
        this.catalogs = res.data;
        this.data = this.displayedRecords();
      });
    },
    selectFilter() {
      this.catalogs = this.catalogs.reverse();
      this.pagination();
    },
  },

  created() {
    this.getCountryCatalog();
  },
};
</script>

<style lang="scss" scoped></style>
