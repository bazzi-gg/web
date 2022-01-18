<template>
  <div id="app">
    <header>
      <div v-if="$nuxt.$route.name !== 'index'" class="is-hidden-tablet p-2">
        <SearchBar
          class="w-100"
          :recent-search="false"
          :mini="true"
          :autocomplete="false"
          @Search="ToRiderPage"
        />
      </div>
      <b-navbar
        class="layout-container is-centered-mobile menu"
        :mobile-burger="false"
        :close-on-click="false"
      >
        <template slot="start">
          <b-navbar-item
            tag="nuxt-link"
            :to="'/'"
            exact
            exact-active-class="menu__item--active"
            class="menu__item"
          >
            홈
          </b-navbar-item>
          <b-navbar-item
            tag="nuxt-link"
            :to="'/Influencer'"
            exact
            exact-active-class="menu__item--active"
            class="menu__item"
          >
            프로/인플루언서
          </b-navbar-item>
          <b-navbar-dropdown label="통계" :right="true" class="menu__item">
            <b-navbar-item
              tag="nuxt-link"
              :to="'/stat/match'"
              exact
              exact-active-class="is-active"
              >매치
            </b-navbar-item>
            <b-navbar-item
              tag="nuxt-link"
              :to="'/stat/license'"
              exact
              exact-active-class="is-active"
              >라이센스
            </b-navbar-item>
          </b-navbar-dropdown>
        </template>
        <template slot="end">
          <div style="align-self: center">
            <SearchBar
              v-if="$nuxt.$route.name !== 'index'"
              class="is-hidden-mobile"
              :recent-search="false"
              :mini="true"
              @Search="ToRiderPage"
              @AutoCompleteClick="ToRiderPage"
            />
          </div>
        </template>
      </b-navbar>
    </header>
    <FirebaseNotice />
    <main>
      <nuxt />
    </main>
    <footer class="footer">
      <div class="layout-container">
        <nav class="level mb-0 is-size-7">
          <div class="level-left">
            <div class="level-item">
              <router-link :to="'/about'"> About BAZZI.GG </router-link>
            </div>
            <div class="level-item">
              <router-link :to="'/private-policy'"> 개인정보처리방침 </router-link>
            </div>
          </div>
        </nav>
        <nav class="level mb-0 is-size-7">
          <div class="level-left">
            <div class="level-item">
              <span
                >© 2020-2022 BAZZI.GG,
                <a href="mailto:contact@bazzi.gg" class="text__underline--hover"
                  >contact@bazzi.gg</a
                ></span
              >
            </div>
          </div>
          <div class="level-right mt-0">
            <div class="level-item">
              <a href="https://discord.gg/BXcwFpFSc7">
                <b-icon
                  size="ri-2x"
                  icon="ri-discord-fill"
                  style="width: 13px; vertical-align: middle"
                />
              </a>
            </div>
            <div class="level-item">
              <a href="https://github.com/bazzi-gg" class="has-text-black">
                <b-icon
                  size="ri-2x"
                  icon="ri-github-fill"
                  style="width: 13px; vertical-align: middle"
                />
              </a>
            </div>
          </div>
        </nav>
        <nav class="level mb-0 is-size-7">
          <div class="level-left">
            <div class="level-item">Data based on NEXON DEVELOPERS</div>
          </div>
        </nav>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "canonical",
          href: "https://bazzi.gg" + this.$route.path,
        },
      ],
    };
  },
  methods: {
    ToRiderPage(nickname, that) {
      this.$router.push({
        name: "rider-rider",
        params: { rider: nickname },
      });
      that.autocompletes = [];
      that.nickname = "";
    },
  },
};
</script>
<style lang="css">
#app {
  overflow-x: hidden;
}
html,
body,
#__nuxt,
#__layout,
#app {
  width: 100%;
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
}
#app > main {
  background-color: #f5f5f5;
  flex: 1;
}
@media screen and (max-width: 768px) {
  body {
    font-size: 12px;
  }
}
</style>
<style lang="css" scoped>
.footer {
  padding: 1.5rem 0.75rem;
}
header {
  background-color: #272c34;
}
.menu__item {
  margin-right: 9px;
}
.menu__item:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 50%;
  right: 50%;
  bottom: 0;
  background: white;
  height: 4px;
}

.menu__item:hover:before,
.menu__item--active:before {
  left: 0;
  right: 0;
  background-color: white;
}
.menu__item--active {
  color: white !important;
}
.menu {
  font-size: 14px;
  background: transparent;
}
.level {
  display: flex;
}
.level .level-left {
  display: flex;
}
.level .level-right {
  display: flex;
}
.level-item {
  margin-right: 0.75rem;
  margin-bottom: 0rem;
}
.navbar-dropdown > a {
  color: black;
}
@media screen and (max-width: 768px) {
  .menu__item {
    padding: 0;
  }
  .is-centered-mobile >>> .navbar-start {
    margin-right: initial;
  }
  .is-centered-mobile >>> .navbar-end {
    justify-content: initial;
    margin-left: initial;
  }
  .is-centered-mobile >>> .navbar-menu {
    justify-content: center;
  }
  .footer {
    padding: 0.75rem;
  }
  .navbar-item {
    font-size: 12px;
  }
}
</style>
