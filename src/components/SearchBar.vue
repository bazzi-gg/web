<template>
  <div
    v-click-outside="CloseAutocompleteIfMini"
    class="search-bar"
    :class="{ 'search-bar--mini': mini }"
  >
    <div v-if="recentSearch && recentSearches.length > 0" class="search-bar__recent">
      <p class="pt-2 pl-3 has-text-gray is-size-7">최근 전적 검색한 라이더</p>
      <div class="columns is-multiline is-flex">
        <div v-for="(item, i) in recentSearches" :key="i" class="column is-4 is-6-mobile">
          <a @click="RecentSearchClick(item)"> {{ item }}</a>
          <i
            class="ri-close-line ri-lg search-bar__recent_item__remove is-clickable"
            style="color: rgb(74, 74, 74)"
            @click="$store.commit('recent-search/REMOVE_NICKNAME', item)"
          />
        </div>
      </div>
    </div>
    <div class="search-bar__input__box">
      <b-input
        ref="inputBar"
        v-model="nickname"
        :placeholder="placeholder"
        custom-class="search-bar__input"
        icon-right="icon--search"
        icon-right-clickable
        :maxlength="12"
        :has-counter="false"
        @blur="$emit('FocusOut')"
        @focus="FocusIfMini"
        @keyup.enter.native="Search(nickname)"
        @icon-right-click="Search(nickname)"
      />
    </div>
    <div v-show="isExpandAutocomplete" class="search-bar__autocomplete">
      <ul>
        <li
          v-for="item in autocompletes"
          :key="item.nickname"
          class="search-bar__autocomplete__item"
          @click="AutoCompleteClick(item.nickname)"
        >
          <img
            class="search-bar__autocomplete__item__character"
            :src="`${$config.metadataUrl}character/${item.characterHash}.png`"
            alt="마지막으로 사용한 캐릭터"
            @error="CharacterErrorCallback"
          />
          <span class="search-bar__autocomplete__item__nickname">{{
            item.nickname
          }}</span>
          <span class="search-bar__autocomplete__item__license">
            <LicenseBadge
              :license="item.license"
              :racing-master-emblem="item.racingMasterEmblem"
            />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";
import { CharImgErrorCallback } from "../helpers/callback";
export default {
  directives: {
    ClickOutside,
  },
  props: {
    recentSearch: {
      default: true,
      type: Boolean,
      required: false,
    },
    mini: {
      default: false,
      type: Boolean,
      required: false,
    },
    placeholder: {
      default: "라이더명을 입력해주세요.",
      type: String,
      required: false,
    },
    autocomplete: {
      default: true,
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      nickname: "",
      isExpandAutocomplete: false,
      autocompletes: [],
    };
  },
  computed: {
    recentSearches() {
      return this.$store.getters["recent-search/get"];
    },
  },
  watch: {
    nickname(val) {
      this.$emit("onValueChanged", val);
      if (!this.autocomplete) {
        return;
      }
      const regex = /^([0-9]|[ㄱ-ㅎ]|[ㅏ-ㅣ]|[가-힣]|[a-z]|[A-Z])+$/g;
      if (regex.test(val)) {
        this.AutoComplete(val);
      } else {
        this.isExpandAutocomplete = false;
      }
    },
  },
  methods: {
    CharacterErrorCallback: CharImgErrorCallback,
    async AutoComplete(nickname) {
      const res = await this.$api.getAutocomplete(nickname);
      if (res.success) {
        this.autocompletes = res.result;
      }
      this.isExpandAutocomplete = res.success;
    },
    RecentSearchClick(nickname) {
      this.$emit("RecentSearchClick", nickname, this);
    },
    Search(nickname) {
      if (nickname === "") {
        return;
      }
      this.$emit("Search", nickname, this);
    },
    AutoCompleteClick(nickname) {
      this.$emit("AutoCompleteClick", nickname, this);
    },
    FocusIfMini() {
      this.$emit("Focus");
      if (this.mini === false) {
        return;
      }
      this.isExpandAutocomplete =
        this.autocompletes.length > 0 && this.nickname.length > 0;
    },
    CloseAutocompleteIfMini() {
      if (this.mini === false) {
        return;
      }
      this.isExpandAutocomplete = false;
    },
  },
};
</script>
<style scoped>
::v-deep .search-bar__input::placeholder {
  color: hsl(0, 0%, 48%);
  font-size: 14px;
}
::v-deep .search-bar__input:focus {
  border-color: transparent;
  box-shadow: none;
}
::v-deep .search-bar__input {
  box-shadow: none;
  color: hsl(0, 0%, 21%);
  line-height: 20px;
  border: none;
  font-size: 14px;
  padding-top: 7.5px;
  padding-bottom: 7.5px;
  padding-left: 16px;
  caret-color: hsl(0, 0%, 21%);
}
::v-deep .search-bar__input__box .icon {
  padding-right: 1rem;
  height: 100% !important;
}
/* ri-search-line */
::v-deep .icon--search {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='40' height='40'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z' fill='rgba(255,99,132,1)'/%3E%3C/svg%3E");
}

.search-bar__input__box {
  padding-bottom: 0.75rem;
  padding-top: 0.5rem;
  flex: 1;
}
.search-bar__recent {
  border-bottom: solid 1px #efefef;
}

.columns {
  margin-top: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
  padding-bottom: 1rem;
}
.search-bar__recent_item__remove {
  color: rgb(74, 74, 74);
  vertical-align: middle;
  line-height: 19px;
  float: right;
}
.search-bar__autocomplete {
  border-top: solid 1px #efefef;
  z-index: 10;
  position: absolute;
  background-color: white;
  width: 410px;
}
.search-bar__autocomplete__item:hover {
  cursor: pointer;
  background-color: #f9f9f9;
}
.search-bar__autocomplete__item {
  padding: 0.7rem 0.2rem 0.7rem 0.2rem;
}
.search-bar__autocomplete__item__character {
  vertical-align: middle;
  width: 60px;
}
.search-bar__autocomplete__item__license {
  padding-left: 5px;
  color: gray;
  font-size: 12px;
}
.search-bar {
  background: white;
  border-radius: 2px;
  width: 410px;
}
@media screen and (max-width: 420px) {
  .search-bar,
  .search-bar__autocomplete {
    width: 300px;
  }
  .search-bar__autocomplete__item {
    padding: 0.3rem 0.2rem 0.3rem 0.2rem;
  }
}
@media screen and (min-width: 769px) {
  .search-bar,
  .search-bar__autocomplete {
    width: 560px;
  }
}
.search-bar--mini > .search-bar__autocomplete {
  z-index: 1000;
  position: absolute;
  width: inherit;
}
.search-bar--mini > .search-bar__autocomplete > ul {
  background-color: white;
}
.search-bar--mini,
.search-bar--mini .search-bar__autocomplete {
  width: 260px;
}
.search-bar--mini > .search-bar__input__box {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
</style>
