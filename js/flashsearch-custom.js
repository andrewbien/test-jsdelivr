flashsearch.commonTemplates = {
  "fs-price": `
<div class="fs-price" :data-testid="buildDataTestId('price')">
  <span v-if="onSale && enableCompareAtPrice">
    <span
      class="fs-price--type-sale"
      v-html="fsUtils.formatDisplayMoney(compareAtPrice)"
      :data-testid="buildDataTestId('ca-price')"
    />
    <span
      class="fs-price--type-origin"
      v-html="fsUtils.formatDisplayMoney(price)"
    />
  </span>
  <span
    v-else
    class="fs-price--type-regular"
    v-html="fsUtils.formatDisplayMoney(price)"
  />
</div>
    `,

  "fs-price-range": `
<p class="fs-price" :data-testid="buildDataTestId('price')">
  <template v-if="priceVaries && priceVariesFormat === 'from'">
    <span class="fs-price--text">{{$t("general.price.from")}}</span>
    <span class="fs-price--type-regular">&nbsp;
    <span class="fs-price-min" v-html="fsUtils.formatDisplayMoney(priceMin)"/>
    </span>
  </template>
  <span v-else-if="priceVaries" class="fs-price--type-regular">
    <span
      class="fs-price-min"
      v-html="fsUtils.formatDisplayMoney(priceMin)"
    />
    <span class="fs-price__split">-</span>
    <span
      class="fs-price-max"
      v-html="fsUtils.formatDisplayMoney(priceMax)"
    />
  </span>
  <span v-else-if="onSale && enableCompareAtPrice">
    <span
      class="fs-price--type-sale"
      v-html="fsUtils.formatDisplayMoney(compareAtPriceMin)"
      :data-testid="buildDataTestId('ca-price')"
    />
    <span
      class="fs-price--type-origin"
      v-html="fsUtils.formatDisplayMoney(priceMin)"
    />
  </span>
  <span
    v-else
    class="fs-price--type-regular"
    v-html="fsUtils.formatDisplayMoney(priceMin)"
  />
</p>
    `,

  "fs-review-rate": `
<span class="fs-review-rate">
  <fs-rate
    class="fs-review-rate__rate"
    disabled
    :value="value"
    :style="{color: color}"
    :allow-half="allowHalf"
  />
  <span v-if="text" class="fs-review-rate__text" data-testid="review-rate-text"> {{text}} </span>
</span>
`,

  "fs-custom-skeleton": `
<fs-skeleton active :paragraph="{rows: count, width: width}" :title="false"/>
    `,
};

flashsearch.searchResultsTemplates = {
  "fs-app": `
<fs-config-provider prefixCls="fs">
    <router-view></router-view>
</fs-config-provider>
    `,

  "fs-main": `
<!-- Page heading -->
<fs-collection-page-heading v-if="isCollPage"/>
<fs-search-page-heading v-if="isSearchPage" :total-products="totalProducts" :query="query"/>

<div
  class="fs-container"
  :class="'fs-container-' + layoutWidth"
>
  <fs-layout>
    <!-- Header -->
    <fs-layout-header>
      <!-- collection header -->
      <fs-collection-header v-if="isCollPage" :header="collHeader" data-testid="sr-collection-header"/>
      <!-- search section -->
      <fs-search-section
        v-if="isSearchPage"
        :is-loading="isSearchLoading"
        :enable-search-page-header="enableSearchPageHeader"
        :total-products="totalProducts"
        :query="query"
        :enable-search-box="enableSearchBox"
        :sbQuery="sbQuery"
        @on-search="onSearch"
        @on-change-sb-query="onChangeQuery"
      />
    </fs-layout-header>
    <fs-layout>
      <!-- Toolbar: sortBy, views, open filters -->
      <fs-toolbar
        v-if="!noMatchingFound"
        class="fs-main__toolbar"
        :is-filter-icon-opened="isFilterIconOpened"
        :is-loading="isSearchLoading"
        :total-products="totalProducts"
        :view-type="viewType"
        @collapse-filters="collapseFilters"
        @on-mobile-filters-icon-click="onMobileFiltersIconClick"
        @on-filters-sidebar-icon-click="onFiltersSidebarIconClick"
      />
      <!-- Filters section: horizontal layout -->
      <fs-filters-section-horizontal
        v-if="isHorizontalLayout"
        :search-result="searchResult"
        :collapse-active-key="collapseActiveKey"
      />
      <!-- Filters section: horizontal style 2 layout -->
      <fs-filters-section-horizontal-style-2
        v-if="isHorizontalStyle2Layout && !noMatchingFound"
        :search-result="searchResult"
        :collapse-active-key="collapseActiveKey"
        :is-loading="isSearchLoading"
      />
      <!-- Filters section: filters sidebar layout-->
      <fs-filters-section-filters-sidebar
        v-if="isFiltersSidebarLayout && shouldShowFiltersSidebar"
        :search-result="searchResult"
        :visible="shouldShowFiltersSidebar"
        @on-close="closeFiltersSidebar"
        @show-results="showResultsOnFiltersSidebar"
      />
      <!-- Filters section: mobile layout -->
      <fs-filters-section-mobile
        :search-result="searchResult"
        :should-show-mobile-filter="shouldShowMobileFilter"
        @close-mobile-filters="closeMobileFilters"
        @show-results="showResults"
      />
    </fs-layout>
    <!-- Filter by: horizontal layout only -->
    <fs-layout v-if="isHorizontalLayout || isHorizontalStyle2Layout">
      <fs-filter-by :is-loading="isSearchLoading" />
    </fs-layout>
    <fs-layout>
      <!-- Filters section: vertical layout -->
      <fs-layout-sider v-if="isVerticalLeftLayout && !noMatchingFound" :width="270">
        <fs-filters-section-vertical :is-loading="isSearchLoading" :searchResult="searchResult"/>
      </fs-layout-sider>
      <fs-layout-content>
        <!-- Empty page -->
        <fs-sr-empty-page
          v-if="noMatchingFound"
          :is-fetching="isSearchFetching"
          :is-search-page="isSearchPage"
          :is-coll-page="isCollPage"
        />
        <!-- Search results -->
        <div class="fs-sr-wrapper fs-main__sr-wrapper">
          <fs-search-results-items
            :search-result="searchResult"
            :view-type="viewType"
            :is-loading="isSearchFetching"
          />
          <fs-custom-pagination
            v-if="!noMatchingFound"
            :total="totalProducts"
            :current-num-of-products="currentNumOfProducts"
            :current="page"
            @change="onChangePage"
            @load-more="onLoadMore"
            :has-next-page="hasNextPage"
            :is-load-more-fetching="isLoadMoreProdFetching"
          />
        </div>
        <!-- Quick view -->
        <fs-quick-view-item
          v-if="shouldShowQuickView"
          :product="currentQvProduct"
        />
      </fs-layout-content>
    </fs-layout>
  </fs-layout>
</div>
    `,
  
  "fs-collection-page-heading": `
<div v-if="enable" class="fs-coll-page-heading">
  <div class="fs-coll-page-heading__image" :style="{'background-image': 'url(' + imageUrl + ')'}" />
  <div class="fs-coll-page-heading__text">
    <h1 v-if="collTitleEnable" class="fs-coll-page-heading__coll-title">
      {{ collection.title }}
    </h1>
    <div v-if="collDescEnable" class="fs-coll-page-heading__coll-desc" v-html="collection.description" />
  </div>
</div>
  `,

  "fs-search-page-heading": `
<div v-if="enable" class="fs-search-page-heading">
  <div class="fs-search-page-heading__image" :style="{'background-image': 'url(' + imageUrl + ')'}" />
  <div class="fs-search-page-heading__text">
    <h1 v-if="searchTextEnable" class="fs-search-page-heading__search-text">
      {{ $t("searchPageHeading.searchResultsWithCount", {count: totalProducts, searchTerm: query}) }}
    </h1>
  </div>
</div>
  `,

  "fs-collection-header": `
<div v-if="enable" class="fs-collection-header" data-testid="sr-collection-header">
  {{header ? header : $t("searchResults.collectionPageHeader.products")}}
</div>
  `,

  "fs-search-section": `
<div v-if="enableSearchPageHeader || enableSearchBox" class="fs-search-section">
  <!-- Skeleton: Search header -->
  <div
    v-if="isLoading && enableSearchPageHeader"
    class="fs-search-section"
  >
    <h1 class="fs-search-result-header fs-search-section__header">
      <fs-custom-skeleton class="fs-skeleton-search-result-header" />
    </h1>
  </div>
  <!-- Search result header -->
  <h1
    v-else-if="enableSearchPageHeader"
    class="fs-search-result-header fs-search-section__header"
    data-testid="sr-search-page-header"
  >
    {{$t("searchResults.searchPageHeader.pageHeader", {count: totalProducts,
    searchTerm: query})}}
  </h1>
  <!-- Search box: desktop -->
  <fs-input-search
    v-if="enableSearchBox"
    class="fs-search-box"
    :placeholder="$t('searchResults.searchPageHeader.searchBoxPlaceholder')"
    @search="onSearch"
    :value="sbQuery"
    @change="onChangeSbQuery"
    type="search"
    name="q"
    data-testid="search-box"
    enter-button
  />
  <!-- Search box: mobile -->
  <fs-searchbox-mobile :default-value="sbQuery" />
</div>
  `,

  "fs-toolbar": `
<div class="fs-toolbar">
  <div class="fs-toolbar__section fs-toolbar__section--top">
    <div class="fs-toolbar__col--left">
      <fs-filters-icon
        :opened="isFilterIconOpened"
        @collapse-filters="collapseFilters"
        @on-mobile-filters-icon-click="onMobileFiltersIconClick"
        @on-filters-sidebar-icon-click="onFiltersSidebarIconClick"
        :is-loading="isLoading"
      />
    </div>
    <div class="fs-toolbar__col--middle">
    <fs-search-results-views
      :view-type="viewType"
      :is-loading="isLoading"
    />
    </div>
    <div class="fs-toolbar__col--right">
      <fs-total-products
        class="fs-toolbar__total-products--right fs-toolbar__total-products--section-top"
        :total="totalProducts"
        :is-loading="isLoading"
      />
      <fs-search-results-sort-by
        :is-loading="isLoading"
      />
    </div>
  </div>
  <div
    class="fs-toolbar__section fs-toolbar__section--bottom"
  >
    <div class="fs-toolbar__col--right">
      <fs-total-products
        class="fs-toolbar__total-products--right"
        :is-loading="isLoading"
        :total="totalProducts"
      />
    </div>
  </div>
</div>
  `,

  "fs-sr-empty-page": `
<div
  v-if="!isFetching && (isSearchPage || isCollPage)"
  class="fs-sr-empty-page"
  data-testid="sr-empty"
>
  <p v-if="isSearchPage" data-testid="sr-search-empty-page-text">
    {{$t("searchResults.emptyPage.searchEmptyPageText")}}
  </p>
  <p v-else-if="isCollPage" data-testid="sr-collections-empty-page-text">
    {{$t("searchResults.emptyPage.collectionsEmptyPageText")}}
  </p>
</div>
  `,

  // Filters
  "fs-filters-section-vertical": `
<div
  class="fs-filters-section fs-filters-section-vertical"
>
  <fs-filter-by clear-all-btn-position="label" :is-loading="isLoading" />
  <fs-filters
    :filters="searchResult.filters"
    :show-collapse="true"
    :is-loading="isLoading"
  />
</div>
  `,

  "fs-filters-section-horizontal": `
<div
  class="fs-filters-section fs-filters-section-horizontal"
>
  <div class="fs-filters-section-inner">
    <fs-collapse :bordered="false" :active-key="collapseActiveKey">
      <fs-collapse-panel
        class="fs-filters__collapse-item"
        key="1"
        :show-arrow="false"
      >
        <fs-row>
          <fs-filters :filters="searchResult.filters" :show-collapse="false" />
        </fs-row>
      </fs-collapse-panel>
    </fs-collapse>
  </div>
</div>
    `,

  "fs-filters-section-horizontal-style-2": `
  <div class="fs-filters-section fs-filters-section-horizontal-style-2">
  <div class="fs-filters-section-inner">
    <h3 v-if="!isLoading" class="fs-filters-sections-horizontal-style-2__title">
      {{$t("searchResults.toolbars.filters")}}
    </h3>
    <fs-row>
      <fs-filters
        :filters="searchResult.filters"
        :show-collapse="false"
        :show-dropdown="true"
        :is-loading="isLoading"
      />
    </fs-row>
  </div>
</div>
  `,

  "fs-filters-section-filters-sidebar": `
  <div
    class="fs-filters-section"
  >
    <fs-drawer
      class="fs-filters-section-filters-sidebar"
      :class="!!layoutType ? 'fs-filters-section-filters-sidebar-' + layoutType : undefined"
      placement="left"
      :closable="true"
      @close="onClose"
      :visible="visible"
    >
      <template #title>
        <span class="fs-filters-title-wrapper">
          <span class="fs-filters-title">{{$t("searchResults.filter.filtersTitle")}}</span>
          <fs-button-clear-all-filter-options v-if="!layoutType || layoutType === 'layout-1'" type="text" />
        </span>
      </template>
      <fs-filters :filters="searchResult.filters" :show-clear-btn-at-bottom-of-options="true" />
      <div class="fs-filters__footer">
        <fs-button
          class="fs-filters__show-results"
          type="primary"
          size="large"
          @click.prevent="showResults"
        >
          {{ $t("searchResults.filter.showResults", {count: (searchResult && searchResult.total > 0 ? searchResult.total  : 0)}) }}
        </fs-button>
        <fs-button-clear-all-filter-options v-if="layoutType === 'layout-2'" />
      </div>
    </fs-drawer>
  </div>
    `,

  "fs-filters-section-mobile": `
<div
  class="fs-filters-section"
>
  <fs-drawer
    class="fs-filters-section-mobile"
    :class="!!layoutType ? 'fs-filters-section-filters-sidebar-' + layoutType : undefined"
    placement="left"
    :closable="true"
    @close="closeMobileFilters"
    :visible="shouldShowMobileFilter"
  >
    <template #title>
      <span class="fs-filters-title-wrapper">
        <span class="fs-filters-title">{{$t("searchResults.filter.filtersTitle")}}</span>
        <fs-button-clear-all-filter-options v-if="!layoutType || layoutType === 'layout-1'" type="text" />
      </span>
    </template>
    <fs-filters :filters="searchResult.filters" :isMobile="true" />
    <div class="fs-filters__footer">
      <fs-button
        class="fs-filters__show-results"
        type="primary"
        size="large"
        @click.prevent="showResults"
      >
        {{ $t("searchResults.filter.showResults", {count: (searchResult && searchResult.total > 0 ? searchResult.total  : 0)}) }}
      </fs-button>
      <fs-button-clear-all-filter-options v-if="layoutType === 'layout-2'" />
    </div>
  </fs-drawer>
</div>
  `,

  "fs-filter-by-each-filter": `
<fs-filter-by
  class="fs-filter-by-each-filter"
  :filter="filter"
  :should-show-top-content="false"
  :should-show-clear-all-btn="false"
  :option-closable="false"
  :should-show-option-label="false"
  :show-coll-options-on-coll-page="true"
  :visible="visible"
  option-test-id="filter-by-option-each-filter"
/>
    `,

  "fs-filter-by": `
<div v-if="isLoading" class="fs-filter-by" :style="{'margin-left': 0}">
  <div class="fs-filter-by__top">
    <div class="fs-filter-by__label">
      <fs-custom-skeleton class="fs-filter-by__skeleton-label" />
    </div>
  </div>
  <div class="fs-filter-by__bottom">
    <fs-custom-skeleton class="fs-filter-by__skeleton-bottom" :count="2" />
  </div>
</div>
<div
  v-else-if="shouldShowFilterBy"
  class="fs-filter-by"
  v-bind="$attrs"
>
  <div v-if="shouldShowTopContent" class="fs-filter-by__top">
    <div class="fs-filter-by__label">Filtered by</div>
    <fs-button-clear-all-filter-options
      v-if="clearAllBtnPosition === 'label' && shouldShowClearAllBtn"
    />
  </div>
  <div class="fs-filter-by__bottom">
    <fs-filter-by-option
      class="fs-filter-by__option"
      v-for="({value, filterLabel, handleCloseFunc}, index) in collectionOptions"
      :key="index"
      :label="shouldShowOptionLabel ? filterLabel + ':' : ''"
      :value="value"
      @close="handleCloseFunc"
      :closable="optionClosable"
      :data-testid="optionTestId"
    />
    <fs-filter-by-option
      class="fs-filter-by__option"
      v-for="(option, index) in options"
      :key="index"
      :label="shouldShowOptionLabel ? option.filterLabel + ':' : ''"
      :value="transformDisplayOption(option)"
      @close="removeOption(option)"
      :closable="optionClosable"
      :data-testid="optionTestId"
    />
    <fs-button-clear-all-filter-options
      v-if="clearAllBtnPosition === 'inline' && shouldShowClearAllBtn && (collectionOptions.length + options.length > 1)"
    />
  </div>
</div>
    `,

  "fs-filter-by-option": `
<div class="fs-filter-by-option">
  <fs-tag :closable="closable" @close="close">
    <span v-if="!!label" class="fs-filter-by-option__label">{{label}}</span>
    {{value}}
  </fs-tag>
</div>
    `,

  "fs-filters": `
<template v-if="isLoading">
  <div
    class="fs-filter"
    v-for="index in [...Array(3).keys()]"
    :key="index"
  >
    <div class="fs-filter__top">
      <h5 class="fs-filter__title" data-testid="filter-title">
        <fs-custom-skeleton class="fs-filter__title__skeleton" />
      </h5>
    </div>
    <fs-custom-skeleton class="fs-filter__skeleton" :count="4" />
  </div>
</template>
<template v-else-if="!!filters">
  <fs-collapse
    v-if="showCollapse || isMobile"
    :expand-icon-position="isMobile ? 'right' : 'left'"
    v-model:activeKey="defaultCollapseActiveKeys"
    @change="changeCollapse"
  >
    <template #expandIcon="{isActive}">
      <fs-right-outlined
        class="fs-filter__collapse-arrow"
        :rotate="isActive ? 270 : 90"
      />
    </template>
    <template v-for="(filter, index) in filters" :key="'' + index">
      <fs-collapse-panel
        v-if="!isFilterEmpty(filter)"
        class="fs-filter"
      >
        <template #header>
          <div class="fs-filter__top">
            <h5 class="fs-filter__title" data-testid="filter-title">
              {{filter.label}}
              <fs-tooltip
                v-if="filter.displayTooltip"
                data-testid="filter-tooltip-content"
              >
                <template #title>
                  <span data-testid="filter-tooltip-content">{{filter.tooltipContent}}</span>
                </template>
                <fs-question-circle-outlined
                  data-testid="filter-tooltip-icon"
                />
              </fs-tooltip>
            </h5>
            <fs-filter-by-each-filter
              v-if="isMobile"
              :filter="filter"
              :visible="shouldShowFilterBy(index)"
            />
            <fs-button-clear-filter-option
              v-else-if="isFilterOptionsDirty(filter)"
              @clear="clearFilterOptions(filter)"
            />
          </div>
        </template>
        <fs-filter :filter="filter" :isMobile="isMobile" :show-clear-btn="isMobile || showClearBtnAtBottomOfOptions" />
      </fs-collapse-panel>
    </template>
  </fs-collapse>
  <template v-else-if="showDropdown">
    <fs-col
      v-for="(filter, index) in filters"
      :key="index"
      v-show="!isFilterEmpty(filter)"
      :xl="6"
      :lg="6"
      :md="12"
      :sm="24"
      :xs="24"
      class="fs-filter"
      data-testid="filter"
    >
      <fs-dropdown
        overlay-class-name="fs-filter-dropdown"
        :trigger="['click']"
        :overlayStyle="{width: filterDropdownWidth + 'px'}"
        v-model:visible="filterDropdownVisible[filter.id]"
      >
        <template #overlay>
          <fs-menu>
            <fs-filter
              :filter="filter"
              :isMobile="isMobile"
              :show-apply-btn="true"
              :show-clear-btn="true"
              :show-swatch-tooltip="false"
            />
          </fs-menu>
        </template>
        <!-- Title -->
        <fs-tooltip data-testid="filter-tooltip-content">
          <template #title v-if="filter.displayTooltip">
            <span data-testid="filter-tooltip-content">{{filter.tooltipContent}}</span>
          </template>
          <fs-button
            size="large"
            class="fs-filter-dropdown__title-btn"
            @click="onClickDropdownTitleBtn"
          >
            <span class="fs-filter-dropdown-btn__left">
              <span class="fs-filter-dropdown__title"> {{filter.label}} </span>
              <!-- Selected filter options count -->
              <span v-if="getFilterOptionsCount(filter) > 0" class="fs-filter-dropdown__options-count-wrapper">
                <span class="fs-filter-dropdown__options-count">{{getFilterOptionsCount(filter)}}</span>
              </span>
            </span>
            <span class="fs-filter-dropdown-btn__right">
              <fs-down-outlined />
            </span>
          </fs-button>
        </fs-tooltip>
      </fs-dropdown>
    </fs-col>
  </template>
  <template v-else>
    <fs-col
      v-for="(filter, index) in filters"
      :key="index"
      v-show="!isFilterEmpty(filter)"
      :xl="6"
      :lg="6"
      :md="12"
      :sm="24"
      :xs="24"
      class="fs-filter"
      data-testid="filter"
    >
      <div class="fs-filter__top">
        <h5 class="fs-filter__title" data-testid="filter-title">
          {{filter.label}}
          <fs-tooltip
            v-if="filter.displayTooltip"
            data-testid="filter-tooltip-content"
          >
            <template #title>
              <span data-testid="filter-tooltip-content"
                >{{filter.tooltipContent}}</span
              >
            </template>
            <fs-question-circle-outlined data-testid="filter-tooltip-icon" />
          </fs-tooltip>
        </h5>
        <fs-button-clear-filter-option
          v-if="isFilterOptionsDirty(filter)"
          @clear="clearFilterOptions(filter)"
        />
      </div>
      <fs-filter :filter="filter" :isMobile="isMobile" />
    </fs-col>
  </template>
</template>
    `,

  "fs-filter": `
<fs-filter-collection
  v-if="isCollectionsFilter"
  :filter="filter"
  :is-mobile="isMobile"
  :show-clear-btn="showClearBtn"
/>
<fs-filter-review-rating
  v-else-if="isReviewRatingFilter"
  :filter="filter"
  :is-mobile="isMobile"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn"
/>
<fs-filter-stock-status
  v-else-if="isStockStatusFilter"
  :filter="filter"
  :is-mobile="isMobile"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn"
/>
<fs-filter-list
  v-else-if="isRangeFilterWithDisplayTypeList"
  :filter="filter"
  :is-mobile="isMobile"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn"
/>
<fs-filter-range
  v-else-if="isRangeFilterWithDisplayTypeRange"
  :filter="filter"
  :is-mobile="isMobile"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn"
  :prefix-symbol="isPriceFilter ? fsUtils.getCurrentCurrencySymbol() : undefined"
/>
<fs-filter-list
  v-else-if="isListFilter"
  :filter="filter"
  :is-mobile="isMobile"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn"
/>
<fs-filter-box
  v-else-if="isBoxFilter"
  :filter="filter"
  :is-mobile="isMobile"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn"
/>
<fs-filter-swatch
  v-else-if="isSwatchFilter"
  :filter="filter"
  :is-mobile="isMobile"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn"
  :show-tooltip="showSwatchTooltip"
/>
    `,

  // Filter types
  "fs-filter-collection": `
<div
  class="fs-filter__content fs-filter-collection__content"
  :class="{'fs-filter--screen-mobile': isMobile}"
>
  <div
    class="fs-filter__content"
    :class="{'fs-filter__content--scrollable': shouldUseScrollbar}"
    data-testid="filter-content"
  >
    <fs-input
      v-if="shouldShowSearchBox"
      class="fs-filter__searchbox"
      @change="onSearch"
      placeholder="Search options"
      :value="query"
      data-testid="filter-searchbox"
    />
    <div
      class="fs-filter__content-inner fs-filter-collection__content-inner"
    >
      <fs-collapse
        v-if="shouldUseMultiLevelCollections"
        expand-icon-position="left"
      >
        <template #expandIcon="{isActive}">
          <fs-right-outlined :rotate="isActive ? 270 : 90" />
        </template>
        <fs-collapse-panel
          v-for="(item, index) in getFilterValues(query, {viewMoreLimit: 5})"
          :key="index"
          force-render
          :show-arrow="hasSubCollections(item.value)"
          :collapsible="!hasSubCollections(item.value) ? 'disabled' : undefined"
        >
          <template #header>
            <fs-filter-list-option
              :label="item.label"
              :count="item.count"
              :is-selected-option="isSelectedItem(item)"
              :show-count="showCount"
              @on-select-option="onClickItem(item)"
            />
          </template>
          <fs-filter-sub-collection
            :filter="filter"
            :sub-collections="getSubCollections(item.value)"
            :parent-collection="item"
            :should-reset-selected-item="shouldResetChild(item)"
            :show-count="showCount"
            @set-highlight-parent="setHighlight(item)"
            :data-testid-prefix="'parent-' + index"
          />
        </fs-collapse-panel>
      </fs-collapse>
      <template v-else>
        <fs-filter-list-option
          v-for="(item, index) in getFilterValues(query, {viewMoreLimit: 5})"
          :key="index"
          :label="item.label"
          :count="item.count"
          :is-selected-option="isSelectedItem(item)"
          @on-select-option="onClickItem(item)"
          :show-count="showCount"
        />
      </template>
    </div>
  </div>
</div>
<fs-filter-actions
  :show-view-more-btn="shouldUseViewMore && getFilterValues(query).length > 5"
  :show-clear-btn="showClearBtn && isFilterOptionsDirty()"
  :is-view-more-status="isViewMoreStatus"
  @view-more="viewMore"
  @on-clear-filter-options="clearFilterOptions"
/>
    `,

  "fs-filter-sub-collection": `
<template v-for="(item, index) in subCollections" :key="index">
  <fs-collapse
    v-if="!!item.subs"
    expand-icon-positon="left"
    data-testid="option-collapse"
  >
    <template #expandIcon="{isActive}">
      <fs-right-outlined :rotate="isActive ? 270 : 90" />
    </template>
    <fs-collapse-panel force-render>
      <template #header>
        <fs-filter-list-option
          :label="item.name"
          :is-selected-option="isSelectedItem(item)"
          :show-count="showCount"
          @on-select-option="onClickItem(item)"
          data-testid="sub-option"
          :label-data-testid="buildTestId(index)"
        />
      </template>
      <fs-filter-sub-collection
        :filter="filter"
        :sub-collections="getSubs(item.value)"
        :parent-collection="parentCollection"
        :should-reset-selected-item="shouldResetChild(item)"
        @set-highlight-parent="setHighlightParentOnSubColl(item)"
        :data-testid-prefix="dataTestidPrefix + '-sub-' + index"
      />
    </fs-collapse-panel>
  </fs-collapse>
  <fs-filter-list-option
    v-else
    :label="item.name"
    :is-selected-option="isSelectedItem(item)"
    :show-count="showCount"
    @on-select-option="onClickItem(item)"
    data-testid="sub-option"
    :label-data-testid="buildTestId(index)"
  />
</template>
    `,

  "fs-filter-list": `
<div
  class="fs-filter__content"
  :class="{'fs-filter-multiple-list__content': filter.multipleSelection, 'fs-filter__content--scrollable': shouldUseScrollbar}"
  data-testid="filter-content"
>
  <fs-input
    v-if="shouldShowSearchBox"
    class="fs-filter__searchbox"
    @change="onSearch"
    placeholder="Search options"
    :value="query"
    data-testid="filter-searchbox"
  />
  <div
    class="fs-filter__content-inner fs-filter-list__content-inner"
  >
    <fs-row v-if="filter.multipleSelection" data-testid="option-groups">
      <fs-col
        v-for="({label, value, count}, index) in getFilterValues(query, {viewMoreLimit: 5})"
        :key="index"
        :span="24"
        @click.prevent="selectOptions(value)"
      >
        <fs-checkbox :value="value" :checked="isSelectedOptions(value)">
          <fs-filter-list-option
            :multiple="true"
            :label="label"
            :count="count"
            :is-selected-options="isSelectedOptions(value)"
          />
        </fs-checkbox>
      </fs-col>
    </fs-row>
    <template v-else>
      <fs-filter-list-option
        v-for="({label, value, count}, index) in getFilterValues(query, {viewMoreLimit: 5})"
        :key="index"
        :label="label"
        :count="count"
        :is-selected-option="isSelectedOption(value)"
        @on-select-option="selectOption(value)"
      />
    </template>
  </div>
</div>
<fs-filter-actions
  :show-view-more-btn="shouldUseViewMore && getFilterValues(query).length > 5"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn && isFilterOptionsDirty()"
  :is-view-more-status="isViewMoreStatus"
  @view-more="viewMore"
  @on-clear-filter-options="clearFilterOptions"
  @on-apply-selections="filter.multipleSelection ? onApplySelections() : onApplySelection()"
/>
    `,

  "fs-filter-box": `
<div
  class="fs-filter__content"
  :class="{'fs-filter__content--scrollable': shouldUseScrollbar}"
  data-testid="filter-content"
>
  <fs-input
    v-if="shouldShowSearchBox"
    class="fs-filter__searchbox"
    @change="onSearch"
    placeholder="Search options"
    :value="query"
    data-testid="filter-searchbox"
  />
  <div
    class="fs-filter__content-inner fs-filter-box__content-inner"
  >
    <fs-filter-box-option
      v-for="({label, count, value}, index) in getFilterValues(query, {viewMoreLimit: 4})"
      :key="index"
      :multiple="filter.multipleSelection"
      :label="label"
      :count="count"
      :is-selected-option="isSelectedOption(value)"
      :is-selected-options="isSelectedOptions(value)"
      @on-select-option="selectOption(value)"
      @on-select-options="selectOptions(value)"
    />
  </div>
</div>
<fs-filter-actions
  :show-view-more-btn="shouldUseViewMore && getFilterValues(query).length > 4"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn && isFilterOptionsDirty()"
  :is-view-more-status="isViewMoreStatus"
  @view-more="viewMore"
  @on-clear-filter-options="clearFilterOptions"
  @on-apply-selections="filter.multipleSelection ? onApplySelections() : onApplySelection()"
/>
    `,

  "fs-filter-range": `
<div class="fs-filter__content fs-filter-range__content">
  <div class="fs-filter-range__amount">
    <span class="fs-filter-range__min">
      <fs-input-number
        size="large"
        :min="initMin"
        :max="initMax"
        :step="filter.range.sliderStep"
        :value="range.min"
        @change="onChangeMin"
        @blur="onAfterChangeMin"
        :formatter="formatMin"
        :parser="parseMin"
        data-testid="filter-range-min"
      />
    </span>
    <span
      class="fs-filter-range__split"
      data-testid="filter-range-split"
    >
      {{filter.range.rangeFormat.replace("{0}", "").replace("{1}", "")}}
    </span>
    <span class="fs-filter-range__max">
      <fs-input-number
        size="large"
        :min="initMin"
        :max="initMax"
        :step="filter.range.sliderStep"
        :value="range.max"
        @change="onChangeMax"
        @blur="onAfterChangeMax"
        :formatter="formatMax"
        :parser="parseMax"
        data-testid="filter-range-max"
      />
    </span>
  </div>
  <div class="fs-filter-range__slider" data-testid="filter-range">
    <fs-slider
      :min="initMin"
      :max="initMax"
      :step="filter.range.sliderStep"
      @change="onChangeRange"
      @after-change="onAfterChangeRange"
      :range="true"
      :value="[range.min, range.max]"
      :marks="marks"
      :tipFormatter="formatTooltip"
    />
  </div>
</div>
<fs-filter-actions
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn && isFilterOptionsDirty()"
  @on-clear-filter-options="clearFilterOptions"
  @on-apply-selections="onApplySelections"
/>
    `,

  "fs-filter-review-rating": `
<div
  class="fs-filter__content fs-filter__content--list"
  :class="{'fs-filter-multiple-list__content': shouldDisplaySelectedRatingOnly && filter.multipleSelection}"
>
  <fs-filter-review-rating-option
    v-for="(value, index) in ['5', '4', '3', '2', '1']"
    :key="index"
    :is-selected="isSelectedOption(value)"
    :disabled="getCount(value) <= 0"
    @on-select="selectOption(value)"
    :rate="parseInt(value)"
    :color="filter.rating.hex"
    :text="shouldDisplaySelectedRatingAndAbove ? $t('searchResults.filter.rateTextAndUp') : ''"
    :count="getCount(value)"
  />
</div>
<fs-filter-actions
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn && isFilterOptionsDirty()"
  @on-clear-filter-options="clearFilterOptions"
  @on-apply-selections="onApplySelections"
/>
    `,

  "fs-filter-stock-status": `
<div
  class="fs-filter__content fs-filter-multiple-list__content"
  data-testid="filter-content"
>
  <div class="fs-filter__content-inner">
    <fs-row data-testid="option-groups">
      <fs-col
        v-for="({label, value, count}, index) in filterValues"
        :key="index"
        :span="24"
        @click.prevent="selectOptions(value)"
      >
        <fs-checkbox :value="value" :checked="isSelectedOptions(value)">
          <fs-filter-list-option
            :multiple="true"
            :label="label"
            :count="count"
            :is-selected-options="isSelectedOptions(value)"
          />
        </fs-checkbox>
      </fs-col>
    </fs-row>
  </div>
</div>
<fs-filter-actions
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn && isFilterOptionsDirty()"
  @on-clear-filter-options="clearFilterOptions"
  @on-apply-selections="onApplySelections"
/>
    `,

  "fs-filter-swatch": `
<div
  class="fs-filter__content"
  :class="{'fs-filter__content--scrollable': shouldUseScrollbar}"
  data-testid="filter-content"
>
  <fs-input
    v-if="shouldShowSearchBox"
    class="fs-filter__searchbox"
    @change="onSearch"
    placeholder="Search options"
    :value="query"
    data-testid="filter-searchbox"

  />
  <div
    class="fs-filter__content-inner fs-filter-swatch__content-inner"
  >
    <fs-filter-swatch-option
      v-for="({label, count, value, hex, imageUrl}, index) in getFilterValues(query, {viewMoreLimit: isMobile ? 5 : 20})"
      :key="index"
      :label="label"
      :count="count"
      :imageUrl="imageUrl"
      :hex="hex"
      :multiple="filter.multipleSelection"
      :is-selected-option="isSelectedOption(value)"
      :is-selected-options="isSelectedOptions(value)"
      @on-select-options="selectOptions(value)"
      @on-select-option="selectOption(value)"
      :show-tooltip="showTooltip"
    />
  </div>
</div>
<fs-filter-actions
  :show-view-more-btn="shouldUseViewMore && getFilterValues(query).length > (isMobile ? 5 : 20)"
  :show-apply-btn="showApplyBtn"
  :show-clear-btn="showClearBtn && isFilterOptionsDirty()"
  :is-view-more-status="isViewMoreStatus"
  @view-more="viewMore"
  @on-clear-filter-options="clearFilterOptions"
  @on-apply-selections="filter.multipleSelection ? onApplySelections() : onApplySelection()"
/>
    `,

  "fs-filter-box-option": `
<fs-tooltip
  :title="label + ' ' + '(' + count + ')'"
  :mouse-leave-delay="0"
  :mouse-enter-delay="1"
  overlay-class-name="fs-filter-option__tooltip"
>
  <fs-button
    class="fs-filter-option fs-filter-box-option__option"
    :class="{'fs-filter-box-option__option--selected': isSelected}"
    @click.prevent="onSelect"
    role="checkbox"
    :aria-checked="isSelected ? 'true' : 'false'"
    data-testid="option"
  >
    <span
      class="fs-filter-option-value fs-filter-box-option__value"
      data-testid="option-value"
    >
      {{label}}
    </span>
    <fs-filter-option-amount
      class="fs-filter-box-option__amount"
      :count="count"
    />
  </fs-button>
</fs-tooltip>
    `,

  "fs-filter-list-option": `
<div
  class="fs-filter-option"
  :class="{'fs-filter-option--single-list': !multiple, 'fs-filter-option--multiple-list': multiple, 'fs-filter-option--selected': isSelected}"
  @click.prevent="onSelect"
  data-testid="option"
  role="checkbox"
  :aria-checked="isSelected ? 'true' : 'false'"
>
  <div v-if="label !== undefined" class="fs-filter-option-value" :data-testid="labelDataTestid">
    {{label}}
  </div>
  <fs-filter-option-amount v-if="showCount && count !== undefined" :count="count" />
</div>
  `,

  "fs-filter-review-rating-option": `
<a
  class="fs-filter-option fs-filter-option--single-list fs-filter-review-rating-option"
  :class="{'fs-filter-option--selected': isSelected, 'fs-filter-review-rating-option--disabled': disabled}"
  @click.prevent="onSelect"
  role="checkbox"
  :aria-checked="isSelected ? 'true' : 'false'"
  data-testid="option"
>
  <span class="fs-filter-option-value">
    <span :style="{display: 'none'}" data-testid="option-value">
      {{rate}}
    </span>
    <fs-review-rate :value="rate" :color="color" :text="text" />
  </span>
  <fs-filter-option-amount :count="count" />
</a>
  `,

  "fs-filter-swatch-option": `
<fs-tooltip
  :title="showTooltip ? label + ' ' + '(' + count + ')': undefined"
  :mouse-leave-delay="0"
  :mouse-enter-delay="1"
  overlay-class-name="fs-filter-option__tooltip"
>
  <a
    @click.prevent="onSelect"
    class="fs-filter-option fs-filter-swatch-option"
    :class="{'fs-filter-option--selected': isSelected}"
    role="checkbox"
    :aria-checked="isSelected ? 'true' : 'false'"
    data-testid="option"
  >
    <div class="fs--filter-swatch-option__col-left">
      <fs-lazy-bg-img
        v-if="!!imageUrl"
        class="fs-filter-swatch-option__image"
        :class="{'fs-filter-swatch-option--selected': isSelected, 'fs-filter-swatch-option--has-border': fsUtils.isWhiteColor(hex)}"
        :bg="imageUrl"
        :bg-size="100"
      />
      <span
        v-else
        class="fs-filter-swatch-option__image"
        :class="{'fs-filter-swatch-option--selected': isSelected, 'fs-filter-swatch-option--has-border': fsUtils.isWhiteColor(hex)}"
        :style="{'background-color': hex}"
      />
      <span
        class="fs-filter-option-value fs-filter-swatch-option__value"
        data-testid="option-value"
      >
        {{label}}
      </span>
    </div>
    <div class="fs-filter-swatch-option__col-right">
      <fs-filter-option-amount class="fs-filter-swatch-option__amount" :count="count" />
    </div>
  </a>
</fs-tooltip>
    `,

  "fs-filter-option-amount": `
<span
  v-if="enable"
  class="fs-filter-option-amount"
  data-testid="option-amount"
>
  ({{count}})
</span>
  `,

  "fs-apply-filter-selections-btn": `
<fs-button type="primary" class="fs-apply-filter-selections-btn" @click.prevent="onApply">
  {{$t("searchResults.filter.applySelections")}}
</fs-button>
    `,

  "fs-filter-actions": `
<div class="fs-filter-actions">
  <div v-if="showViewMoreBtn" class="fs-filter-actions__top">
    <fs-button-view-more-filter-options
      v-if="showViewMoreBtn"
      :is-view-more-status="isViewMoreStatus"
      @view-more="viewMore"
    />
  </div>
  <div v-if="showApplyBtn || showClearBtn" class="fs-filter-actions__bottom">
    <fs-apply-filter-selections-btn v-if="showApplyBtn" @on-apply="onApplySelections"/>
    <fs-button-clear-filter-option
      v-if="showClearBtn"
      @clear="onClearFilterOptions"
    />
  </div>
</div>
    `,
  // End filter types

  "fs-filters-icon": `
<div v-if="enable && isLoading" class="fs-filters-icon-wrapper">
  <div v-if="isHorizontalLayout" class="fs-filters-icon">
    <fs-custom-skeleton class="fs-filters-icon__skeleton" />
  </div>
  <div class="fs-filters-icon fs-filters-icon--mobile">
    <fs-custom-skeleton class="fs-filters-icon__skeleton--mobile" />
  </div>
</div>
<div v-else-if="enable" class="fs-filters-icon-wrapper" v-bind="$attrs">
  <div
    v-if="isHorizontalLayout"
    class="fs-filters-icon"
    :class="{'fs-filters-icon--opened': opened}"
    data-testid="sr-filter-icon"
    @click="collapseFilters"
  >
    <div class="fs-filters-icon__icons" :class="{'opened': opened}">
      <span class="fs-filters-icon__icon-wrapper fs-icon-slider">
        <fs-sliders-outlined />
      </span>
      <span class="fs-filters-icon__icon-wrapper fs-icon-close">
        <fs-close-outlined />
      </span>
    </div>
    <span class="fs-filters-icon__label" data-testid="sr-filter-label">{{$t("searchResults.toolbars.filters")}}</span>
  </div>
  <div
    v-if="isFiltersSidebarLayout"
    class="fs-filters-icon fs-filters-icon--sidebar"
    data-testid="sr-filter-icon-sidebar"
    @click="onFiltersSidebarIconClick"
  >
    <div class="fs-filters-icon__icons">
      <span class="fs-filters-icon__icon-wrapper fs-icon-slider">
        <fs-sliders-outlined />
      </span>
    </div>
    <span class="fs-filters-icon__label" data-testid="sr-filter-label-mobile">{{$t("searchResults.toolbars.filters")}}</span>
  </div>
  <div
    class="fs-filters-icon fs-filters-icon--mobile"
    data-testid="sr-filter-icon-mobile"
    @click="onMobileFiltersIconClick"
  >
    <div class="fs-filters-icon__icons">
      <span class="fs-filters-icon__icon-wrapper fs-icon-slider">
        <fs-sliders-outlined />
      </span>
    </div>
    <span class="fs-filters-icon__label" data-testid="sr-filter-label-mobile">{{$t("searchResults.toolbars.filters")}}</span>
  </div>
</div>
    `,

  "fs-button-clear-filter-option": `
<fs-button
  type="link"
  class="fs-clear-filter-option"
  @click.stop.prevent="clear"
  data-testid="filter-clear"
>
  {{$t("searchResults.filter.clear")}}
</fs-button>
    `,

  "fs-button-clear-all-filter-options": `
<fs-button
  v-show="shouldShowButton"
  @click="clearAll"
  type="link"
  data-testid="filter-by-clear-all"
  class="fs-clear-all-filter-options"
  :class="{'fs-clear-all-filter-options--text': type === 'text'}"
>
  {{$t("searchResults.filter.clearAll")}}
</fs-button>
    `,

  "fs-button-view-more-filter-options": `
<fs-button
  type="link"
  class="fs-view-more-filter-options"
  @click.prevent="viewMore"
  data-testid="filter-view-more"
>
  {{isViewMoreStatus ? $t("searchResults.filter.viewLess") : $t("searchResults.filter.viewMore")}}
</fs-button>
    `,
  // End filters

  "fs-searchbox-mobile": `
<span
  class="fs-input-search fs-search-box fs-search-box--mobile fs-input-search-enter-button fs-input-group-wrapper"
>
  <span class="fs-input-wrapper fs-input-group">
    <input
      id="fs-searchbox-on-search-page"
      placeholder="Search"
      data-testid="search-box-mobile"
      type="search"
      name="q"
      class="fs-input"
      :value="defaultValue"
      :ref="el => inputRef = el"
    />
    <span class="fs-input-group-addon">
      <fs-button
        class="fs-input-search-button"
        key="enterButton"
        type="primary"
        @click.prevent="onSearch"
      >
        <template #icon><fs-search-outlined /></template>
      </fs-button>
    </span>
  </span>
</span>
    `,

  "fs-total-products": `
<div v-if="enable && isLoading" class="fs-total-products">
  <fs-custom-skeleton class="fs-total-products__skeleton" />
</div>
<div v-else-if="enable" class="fs-total-products" v-bind="$attrs">
  <i18n-t
    keypath="searchResults.toolbars.totalProducts"
    tag="span"
    data-testid="sr-total-products-wrapper"
  >
    <template #count>
      <span
        class="fs-total-products__value"
        data-testid="sr-total-products"
      >
        {{total}}
      </span>
    </template>
  </i18n-t>
</div>
    `,

  "fs-search-results-sort-by": `
<div v-if="enable && isLoading" class="fs-sort-by">
  <div class="fs-sort-by__content">
    <fs-custom-skeleton class="fs-sort-by__skeleton-content" />
  </div>
  <div class="fs-sort-by__mobile-content">
    <fs-custom-skeleton class="fs-sort-by__skeleton-mobile-content" />
  </div>
</div>
<div
  v-else-if="enable"
  :class="'fs-sort-by' + (shape ? ' fs-sort-by-shape-' + shape : '')"
  v-bind="$attrs"
  data-testid="sr-sort-by"
>
  <div class="fs-sort-by__content" data-testid="sr-sort-by-select">
    <fs-select
      size="large"
      v-model:value="sortBy"
      @change="changeSortByDesktop"
      :dropdown-match-select-width=false
    >
      <fs-select-option
        v-for="({value, label}, index) in sortByList"
        :key="index"
        :value="value"
        data-testid="sr-sort-by-option"
        class="fs-sort-by-option fs-sort-by__option"
      >
        {{label}}
      </fs-select-option>
    </fs-select>
  </div>
  <div class="fs-sort-by__mobile-content">
    <fs-button
      type="link"
      class="fs-sort-by__button"
      @click.prevent="openSortBy"
      data-testid="sr-sort-by-select-mobile"
    >
      {{$t("searchResults.toolbars.sortBy.sortBy")}}
      <fs-down-outlined
        :style="{'font-size': '10px'}"
        :rotate="shouldOpenSortBy ? 180 : undefined"
      />
    </fs-button>
    <fs-drawer
      placement="bottom"
      :closable="true"
      @close="closeSortBy"
      :visible="shouldOpenSortBy"
      height="auto"
    >
      <template v-slot:title>
        <span class="fs-sort-by-mobile__title" data-testid="sr-sort-by-title">Sort by</span>
      </template>
      <div class="fs-sort-by-mobile__inner">
        <div
          v-for="({value, label}, index) in sortByList"
          :key="index"
          class="fs-sort-by-option fs-sort-by-mobile__option"
          :class="{'fs-sort-by-mobile__option--selected': sortBy === value}"
          @click.prevent="changeSortByMobile(value)"
          data-testid="sr-sort-by-option"
          :aria-selected="sortBy === value ? 'true' : 'false'"
        >
          {{label}}
        </div>
      </div>
    </fs-drawer>
  </div>
</div>
    `,

  "fs-product-buttons": `
<div :class="['fs-product-button-wrapper', 'fs-product-button-desktop-' + buttonDesignDesktop, 'fs-product-button-mobile-' + buttonDesignMobile]" v-bind="$attrs">
  <fs-tooltip v-if="enableQuickView" :title="quickViewText" :overlay-class-name="'fs-product-button-tooltip' + ' fs-product-button-tooltip-desktop-' + buttonDesignDesktop" :placement="buttonDesignDesktop === 'design-7' ? 'left': undefined">
    <a
      class="fs-product-button fs-product-button--type-quick-view"
      rel="nofollow"
      @click="showQuickView"
      data-testid="sr-quick-view-btn"
    >
      <fs-eye-outlined class="fs-product-button__icon" />
      <span class="fs-product-button__text" data-testid="sr-quick-view-text">{{quickViewText}}</span>
    </a>
  </fs-tooltip>
  <template v-if="product.availableForSale && enableAddToCart">
    <fs-tooltip v-if="product.variants.length > 1" :title="selectOptionsText" :overlay-class-name="'fs-product-button-tooltip' + ' fs-product-button-tooltip-desktop-' + buttonDesignDesktop" >
      <a
        class="fs-product-button fs-product-button--type-atc"
        :href="product.url"
        rel="nofollow"
        data-testid="sr-atc-btn"
        @click="onSelectOptions"
      >
        <fs-shopping-cart-outlined class="fs-product-button__icon" />
        <span class="fs-product-button__text" data-testid="sr-atc-text">{{selectOptionsText}}</span>
      </a>
    </fs-tooltip>
    <fs-tooltip v-else :title="addToCartText" :overlay-class-name="'fs-product-button-tooltip' + ' fs-product-button-tooltip-desktop-' + buttonDesignDesktop" >
      <form
        method="post"
        action="/cart/add"
        acceptCharset="UTF-8"
        enctype="multipart/form-data"
        class="fs-product-button fs-product-button--type-atc"
        :id="'fs-product-form-' + currentVariant.id"
        @click="onSubmit"
        data-testid="sr-atc-btn"
      >
        <fs-shopping-cart-outlined class="fs-product-button__icon" />
        <input type="hidden" name="form_type" value="product" />
        <input type="hidden" name="quantity" value="1" min="1" />
        <input type="hidden" name="id" :value="currentVariant.id" />
        <span class="fs-product-button__text" data-testid="sr-atc-text">{{addToCartText}}</span>
      </form>
    </fs-tooltip>
  </template>
  <fs-tooltip v-else-if="enableAddToCart" :title="readMoreText" :overlay-class-name="'fs-product-button-tooltip' + ' fs-product-button-tooltip-desktop-' + buttonDesignDesktop" >
    <a
      class="fs-product-button fs-product-button--type-atc"
      :href="product.url"
      rel="nofollow"
      data-testid="sr-atc-btn"
      @click="onReadMore"
    >
      <fs-info-circle-outlined class="fs-product-button__icon" />
      <span class="fs-product-button__text" data-testid="sr-atc-text">{{readMoreText}}</span>
    </a>
  </fs-tooltip>
</div>
<!-- Add to cart button at bottom -->
<div v-if="enableAddToCart && (buttonDesignDesktop === 'design-7' || buttonDesignMobile === 'design-7')" :class="['fs-product-button-atc-bottom-wrapper', 'fs-product-button-desktop-' + buttonDesignDesktop, 'fs-product-button-mobile-' + buttonDesignMobile]" v-bind="$attrs">
  <div class="fs-product-button-atc-bottom">
    <template v-if="product.availableForSale">
      <a
        v-if="product.variants.length > 1"
        class="fs-product-button-atc-bottom-inner ajax_add_to_cart"
        :href="product.url"
        rel="nofollow"
        @click="onSelectOptions"
      >
        {{selectOptionsText}}
      </a>
      <form
        v-else
        class="fs-product-button-atc-bottom-inner ajax_add_to_cart"
        method="post"
        action="/cart/add"
        acceptCharset="UTF-8"
        enctype="multipart/form-data"
        :id="'fs-product-form-' + currentVariant.id"
        @click="onSubmit"
        data-testid="sr-atc-btn"
      >
        <input type="hidden" name="form_type" value="product" />
        <input type="hidden" name="quantity" value="1" min="1" />
        <input type="hidden" name="id" :value="currentVariant.id" />
        <span class="fs-product-button__text" data-testid="sr-atc-text">{{addToCartText}}</span>
      </form>
    </template>
    <template v-else>
      <a
        class="fs-product-button-atc-bottom-inner ajax_add_to_cart"
        :href="product.url"
        rel="nofollow"
        @click="onReadMore"
      >
        {{readMoreText}}
      </a>
    </template>
  </div>
</div>
    `,

  "fs-product-image": `
<div>
  <a class="fs-product-image__main-image-wrapper" :href="productUrl">
    <fs-lazy-bg-img
      class="fs-product-image__main-image"
      :style="{'padding-top': (1/mainProductImageAspectRatio)*100 + '%' }"
      :src="mainProductImage"
    />
  </a>
  <div
    v-if="secondProductImage && displayImages === 'two-images'"
    :class="'fs-product-image__hover-image-wrapper' + (hoverEffect ? ' fs-product-image-hover-effect-' + hoverEffect : '')"
  >
    <fs-lazy-bg-img
      class="fs-product-image__hover-image"
      :src="secondProductImage"
    />
  </div>
</div>
    `,

  "fs-product-label": `
<span class="fs-label-wrapper">
  <span
    v-if="!availableForSale && enableSoldOutLabel"
    :class="'fs-label fs-label--soldOut' + ' ' + 'fs-' + shape"
    :data-testid="soldOutDataTestid"
  >
    {{$t("general.productLabel.soldOut")}}
  </span>
  <span
    v-if="availableForSale && isNewProduct && enableNewLabel"
    :class="'fs-label fs-label--new' + ' ' + 'fs-' + shape"
  >
    {{$t("general.productLabel.new")}}
  </span>
  <span
    v-if="availableForSale && onSale && enableSaleLabel"
    :class="'fs-label fs-label--onSale' + ' ' + 'fs-' + shape"
    :data-testid="saleDataTestid"
  >
    {{saleLabelType === "percentage-label" ? $t("general.productLabel.salePercentage", {salePercentage: salePercentage}) : $t("general.productLabel.sale")}}
  </span>
</span>
    `,

  "fs-product-title": `
<h3 class="fs-product-title">
  <a :href="url" v-html="title" data-testid="sr-product-title" />
</h3>
  `,

  "fs-sr-review-rate": `
<div class="fs-sr-review-rate" data-testid="sr-review-rate">
  <fs-review-rate
    class="fs-sr-review-rate__review-rate"
    allow-half
    :value="rate"
    :text="count === 0 ? noReviewsText : (count > 1 ? (count + ' ' + reviewsText) : (count + ' ' + reviewText))"
  />
</div>
  `,

  "fs-product-vendor": `
<div class="fs-product-vendor">
  <a
    v-html="vendor"
    data-testid="sr-product-vendor"
    @click="onClickVendor"
  />
</div>
  `,

  "fs-product-description": `
<div class="fs-ellipsis-text fs-product-description" data-testid="sr-product-desc">{{description.replace(/<[^>]*>/g, "")}}</div>
  `,

  "fs-product-color": `
<fs-tooltip
  :title="showTooltip ? tooltipContent: undefined"
  overlay-class-name="fs-filter-option__tooltip"
>
  <span @mouseover="onSelect" class="fs-product-color" :class="{'fs-product-color--selected': isSelected, ['fs-product-color-' + swatchStyle]: true}">
    <fs-lazy-bg-img
      v-if="!!imageUrl"
      class="fs-product-color__value"
      :class="{'fs-product-color--has-border': fsUtils.isWhiteColor(color), ['fs-product-color-' + swatchSize]: true}"
      :bg="imageUrl"
      :bg-size="100"
    />
    <span v-else class="fs-product-color__value" :class="{'fs-product-color--has-border': fsUtils.isWhiteColor(color), ['fs-product-color-' + swatchSize]: true}" :style="(color1 && color2) ? { background: 'linear-gradient(' + color1 + ' 50%, ' + color2 + ' 50%)' } :  color1 ? {'background-color': color1} : {'background-color': color}">
    </span>
  </span>
</fs-tooltip>
  `,

  "fs-product-colors": `
<div class="fs-product-colors" v-if="getVariantColors(product).length > 0">
  <fs-product-color
    v-for="(color, index) in variantColorsToShow"
    :key="index"
    :color="color"
    :color1="getColor1(color)"
    :color2="getColor2(color)"
    :is-selected="isSelectedItemColor(color)"
    @on-select="onSelectItemColor(color)"
    :show-tooltip="true"
    :tooltip-content="color"
    :imageUrl="swatchLayoutType === 'swatch-variant-image' && getVariantsByColor(product, color).length > 0 ? getVariantsByColor(product, color)[0].image.originalSrc : getImageUrlByColor(color) ? getImageUrlByColor(color) : undefined"
    :swatchSize="swatchSize"
    :swatchStyle="swatchStyle"
  />
  <fs-tooltip
    v-if="moreCount > 0 && enableShowMore"
    :title="isShowMore ? $t('searchResults.productItem.showMoreColors', {moreCount: moreCount}) : $t('searchResults.productItem.showLessColors', {moreCount: moreCount})"
    overlay-class-name="fs-filter-option__tooltip"
  >
  <span class="fs-product-color fs-product-colors__more" :class="{['fs-product-color-' + swatchStyle]: true}" @click.prevent="isShowMore ? onShowMore() : onShowLess()">
    <span class="fs-product-color__value" :class="{['fs-product-color-' + swatchStyle]: true}">
    {{isShowMore ? ("+" + moreCount) : ("-" + moreCount)}}
    </span>
  </span>
</fs-tooltip>
</div>
    `,

  "fs-product-sizes": `
<div class="fs-product-sizes" v-if="getVariantSizes(product).length > 0">
  <span class="fs-product-sizes__text">{{getVariantSizes(product).join(", ")}}</span>
</div>
    `,
  
  "fs-wishlist": `
<!-- Growave -->
<div v-if="isGrowaveWishlist" :class="'ssw-faveiticon' + ' sswfaveicon' + product.id + ' fs-wishlist fs-wishlist-growave' + ' fs-wishlist-shape-' + shape">
  <i v-bind="growave.attrs" class="ssw-icon-heart-o ssw-fave-icon ssw-wishlist-element ssw-not-synch"></i>
  <span class="faves-count">...</span>
</div> 
<!-- Wishlist plus -->
<button v-if="isWishlistPlus" :class="'swym-button swym-add-to-wishlist-view-product' + ' fs-wishlist fs-wishlist-wishlistplus' + ' fs-wishlist-shape-' + shape" data-swaction="addToWishlist"  :data-product-id="product.id"></button>
<!-- Wishlist Hero -->
<div v-if="isWishlistHero" :class="'fs-wishlisthero-wrapper' + ' fs-wishlist-shape-' + shape" v-bind="wishlistHero.attrs"></div>
<!-- Wishlist King -->
<div v-if="isWishlistKing" :class="'fs-wishlistking-wrapper' + ' fs-wishlist-shape-' + shape" v-html="wishlistKing.collectionButtonHtml"></div>
<!-- Smart wishlist -->
<span v-if="isSmartWishlist" :class="'smartwishlist' + ' fs-wishlist fs-wishlist-smartwishlist' + ' fs-wishlist-shape-' + shape" :data-product="product.id" :data-variant="currentVariant.id"></span>
  `,

  "fs-quick-view-item": `
<fs-modal
  class="fs-quickview__modal"
  :visible="true"
  @cancel="closeQuickView"
  :footer="null"
>
  <fs-row>
    <fs-col
      :xl="12"
      :lg="12"
      :md="12"
      :sm="24"
      :xs="24"
      class="fs-quickview-thumbs"
    >
      <fs-product-label
        :class="'fs-label--' + productLabelPosition + ' fs-quickview__product-label'"
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
        sold-out-data-testid="sr-qv-product-label-sold-out"
        sale-data-testid="sr-qv-product-label-sale"
        :product="product"
        :current-variant="currentVariant"
        :enable-new-label="enableNewLabel"
        :shape="productLabelShape"
      />
      <fs-carousel arrows dot-position="bottom" :ref="el => caroRef = el">
        <template #prevArrow>
          <div
            class="fs-quickview__slick-arrow fs-quickview__slick-arrow-prev"
          />
        </template>
        <template #nextArrow>
          <div class="fs-quickview__slick-arrow fs-quickview__slick-arrow-next"/>
        </template>
        <div v-for="(image, index) in product.images" :key="index">
          <div class="fs-quickview-thumbs-item-wrapper">
          <fs-lazy-bg-img
            class="fs-quickview-thumbs-item"
            :style="{'background-repeat': 'no-repeat', 'padding-top': isAspectRatioAdaptToImage ? ((image.width/image.height) ? (1/(image.width/image.height))*100 + '%' : undefined) : undefined }"
            :src="image.originalSrc"
          />
          </div>
        </div>
      </fs-carousel>
    </fs-col>
    <fs-col
      :xl="12"
      :lg="12"
      :md="12"
      :sm="24"
      :xs="24"
      class="fs-quickview-product-details-wrapper"
    >
      <div
        class="fs-quickview-product-details"
      >
        <!-- Title -->
        <h1 data-testid="sr-qv-product-title" class="fs-quickview__title">
          <a :href="product.url">{{product.title}}</a>
        </h1>
        <!-- Review rate -->
        <fs-sr-review-rate
          v-if="enableReviewRating"
          class="fs-sr-quickview__review-rate"
          :count="product.reviewCount"
          :rate="product.reviewRatings"
          :reviews-text='$t("searchResults.quickView.rateReviews")'
          :review-text='$t("searchResults.quickView.rateReview")'
          :no-reviews-text='$t("searchResults.quickView.rateNoReviews")'
        />
        <!-- Price -->
        <fs-price
          v-if="enablePrice"
          class="fs-quickview__price"
          :on-sale="onSale"
          :price="currentVariant.price"
          :compare-at-price="currentVariant.compareAtPrice"
          :enable-compare-at-price="enableCompareAtPrice"
          data-testid-prefix="sr-qv"
        />
        <div v-if="enableVendor" class="fs-quickview__vendor" data-testid="sr-qv-product-vendor">{{product.vendor}}</div>
        <div v-if="enableDescription" class="fs-quickview__description fs-ellipsis-text" v-html="product.description" data-testid="sr-qv-product-description"/>
        <fs-form
          v-if="product.availableForSale"
          class="fs-quickview__form"
          :label-col="{span: 24}"
          :wrapper-col="{span: 24}"
          :model="formState"
          @finish="doSubmit"
        >
          <fs-form-item
            v-for="(option, index) in productOptions"
            :key="index"
            :name="option.name"
            :label="option.name"
          >
            <fs-select size="large" v-model:value="formState[option.name]" data-testid="sr-qv-options-select">
              <fs-select-option
                v-for="(value, index) in option.values"
                :key="index"
                :value="value"
                class="fs-quickview__option"
                data-testid="sr-qv-options-select-option"
              >
                {{value}}
              </fs-select-option>
            </fs-select>
          </fs-form-item>
          <div class="fs-quickview__buttons">
            <fs-form-item v-if="isCurrentVariantAvailable && currentVariant.availableForSale" name="quantity" :label="$t('searchResults.quickView.quantity')">
              <fs-input-number
                size="large"
                :min="1"
                v-model:value="formState.quantity"
                class="fs-quickview__quantity"
              />
            </fs-form-item>
            <fs-form-item>
              <fs-button
                v-if="isCurrentVariantAvailable && currentVariant.availableForSale"
                class="fs-quickview__add-to-cart-btn"
                html-type="submit"
                size="large"
                :loading="qvSubmitLoading"
                data-testid="sr-qv-atc-btn"
              >
                {{$t("searchResults.quickView.addToCart")}}
              </fs-button>
              <fs-button
                v-else-if="isCurrentVariantAvailable && !currentVariant.availableForSale"
                size="large"
                class="fs-quickview__add-to-cart-btn"
                :disabled="true"
                data-testid="sr-qv-disabled-btn"
              >
                {{$t("searchResults.quickView.soldOutButton")}}
              </fs-button>
              <fs-button
                v-else
                size="large"
                class="fs-quickview__add-to-cart-btn"
                :disabled="true"
                data-testid="sr-qv-disabled-btn"
              >
                {{$t("searchResults.quickView.unavailable")}}
              </fs-button>
            </fs-form-item>
            <fs-form-item>
              <fs-wishlist shape="button" :product="product" :current-variant="currentVariant"/>
            </fs-form-item>
          </div>
        </fs-form>
        <div class="fs-quickview__soldout-wrapper" v-else>
          <fs-button
            size="large"
            class="fs-quickview__add-to-cart-btn"
            :disabled="true"
            data-testid="sr-qv-disabled-btn"
          >
            {{$t("searchResults.quickView.soldOutButton")}}
          </fs-button>
          <fs-wishlist shape="button" :product="product" :current-variant="currentVariant"/>
        </div>
      </div>
    </fs-col>
  </fs-row>
</fs-modal>
    `,

  "fs-search-results-grid-view-item": `
<fs-col
  :xl="gridViewDesktopColl"
  :lg="gridViewDesktopColl"
  :md="gridViewTabletColl"
  :sm="gridViewMobileColl"
  :xs="gridViewMobileColl"
  :class="'fs-sr-item-wrapper' + (borderType === 'around-grid' ? ' fs-sr-item-bordered' : '') + ' fs-sr-grid-item-wrapper'"
  data-testid="grid-view-item"
  @click="onClickItem"
>
  <div class="fs-sr-grid-item">
    <!-- Image -->
    <div
      :class="'fs-sr-item__image-wrapper' + (borderType === 'around-image' ? ' fs-sr-item-image-bordered' : '') + ' fs-sr-grid-item__image-wrapper'"
    >
      <fs-wishlist :product="product" :current-variant="currentVariant"/>
      <fs-product-label
        :class="'fs-label--' + productLabelPosition + ' fs-sr-grid-item__product-label'"
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
        :sold-out-text='$t("searchResults.gridViewProductItem.soldOut")'
        :sale-text='$t("searchResults.gridViewProductItem.sale")'
        :product="product"
        :current-variant="currentVariant"
        :enable-new-label="enableNewLabel"
        :shape="productLabelShape"
      />
      <fs-product-image
        class="fs-sr-grid-item__image"
        :product-url="product.url"
        :main-product-image="mainProductImage"
        :second-product-image="secondProductImage"
        :main-product-image-aspect-ratio="isAspectRatioAdaptToImage ? mainProductImageAspectRatio : undefined"
        :second-product-image-aspect-ratio="isAspectRatioAdaptToImage ? secondProductImageAspectRatio : undefined"
      />
      <fs-product-buttons
        class="fs-sr-grid-item__product-buttons"
        :enable-quick-view="enableQuickView"
        :enable-add-to-cart="enableAddToCart"
        :product="product"
        :current-variant="currentVariant"
        :quick-view-text='$t("searchResults.gridViewProductItem.quickView")'
        :select-options-text='$t("searchResults.gridViewProductItem.selectOptions")'
        :add-to-cart-text='$t("searchResults.gridViewProductItem.addToCart")'
        :read-more-text='$t("searchResults.gridViewProductItem.readMore")'
        :button-design-desktop="productButtonDesignDesktop"
        :button-design-mobile="productButtonDesignMobile"
      />
      <!-- product size -->
      <fs-product-sizes
       v-if="productSizeEnable"
       :product="product"
       :show-type="productSizeShowType"
       :size-variant-names="productSizeOptionNames"
       :color="productSizeColor"
       :font-size="productSizeFontSize"
       :font-weight="productSizeFontWeight"
      />
    </div>
    <div class="fs-sr-grid-item__info">
      <!-- Title -->
      <fs-product-title
        :url="product.url"
        :title="product.title"
        class="fs-sr-grid-item__title"
      />
      <!-- Review rate -->
      <fs-sr-review-rate
        v-if="enableReviewRating"
        class="fs-sr-grid-item__review-rate"
        :count="product.reviewCount"
        :rate="product.reviewRatings"
        :reviews-text='$t("searchResults.gridViewProductItem.rateReviews")'
        :review-text='$t("searchResults.gridViewProductItem.rateReview")'
        :no-reviews-text='$t("searchResults.gridViewProductItem.rateNoReviews")'
      />
      <!-- Vendor -->
      <fs-product-vendor
        v-if="enableVendor"
        :vendor="product.vendor"
        class="fs-sr-grid-item__vendor"
      />
      <!-- Description -->
      <fs-product-description
        v-if="enableDescription"
        class="fs-sr-grid-item__description"
        :description="product.description"
      />
      <!-- Price -->
      <fs-price-range
        v-if="enablePrice"
        class="fs-sr-item__price fs-sr-grid-item__price"
        :price-varies="priceVaries"
        :on-sale="onSale"
        :price-min="product.priceMin"
        :price-max="product.priceMax"
        :compare-at-price-min="product.compareAtPriceMin"
        :enable-compare-at-price="enableCompareAtPrice"
        data-testid-prefix="sr"
      />
      <!-- product color -->
      <fs-product-colors
       v-if="productColorEnable"
       :product="product"
       :show-type="productColorShowType"
       :swatch-layout-type="productColorSwatchLayoutType"
       :swatch-size="productColorSwatchSize"
       :swatch-style="productColorSwatchStyle"
       :color-variant-names="productColorOptionNames"
       :enable-show-more="productColorShowMoreEnable"
       :show-more-limit="productColorShowMoreLimit"
       :show-more-action="productColorShowMoreAction"
      />
    </div>
  </div>
</fs-col>
    `,

  "fs-search-results-list-view-item": `
<fs-col
  :xl="24"
  :lg="24"
  :md="24"
  :sm="24"
  :xs="24"
  :class="'fs-sr-item-wrapper' + (borderType === 'around-grid' ? ' fs-sr-item-bordered' : '') + ' fs-sr-list-item-wrapper'"
  data-testid="list-view-item"
  @click="onClickItem"
>
  <div class="fs-sr-list-item">
    <fs-row class="fs-sr-list-item__inner">
      <fs-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8" class="fs-sr-list-item__col--left">
        <!-- Image -->
        <div
          class="fs-sr-item__image-wrapper fs-sr-list-item__image-wrapper"
          :class="'fs-sr-item__image-wrapper' + (borderType === 'around-image' ? ' fs-sr-item-image-bordered' : '') + ' fs-sr-list-item__image-wrapper'"
        >
          <fs-wishlist :product="product" :current-variant="currentVariant"/>
          <fs-product-label
            :class="'fs-label--' + productLabelPosition + ' fs-sr-list-item__product-label'"
            :available-for-sale="product.availableForSale"
            :on-sale="onSale"
            :enable-sold-out-label="enableSoldOutLabel"
            :enable-sale-label="enableSaleLabel"
            :sold-out-text='$t("searchResults.listViewProductItem.soldOut")'
            :sale-text='$t("searchResults.listViewProductItem.sale")'
            :product="product"
            :current-variant="currentVariant"
            :enable-new-label="enableNewLabel"
            :shape="productLabelShape"
          />
          <fs-product-image
            class="fs-sr-list-item__image"
            :product-url="product.url"
            :main-product-image="mainProductImage"
            :second-product-image="secondProductImage"
            :main-product-image-aspect-ratio="isAspectRatioAdaptToImage ? mainProductImageAspectRatio : undefined"
            :second-product-image-aspect-ratio="isAspectRatioAdaptToImage ? secondProductImageAspectRatio : undefined"
          />
          <fs-product-buttons
            class="fs-sr-list-item__product-buttons"
            :enable-quick-view="enableQuickView"
            :enable-add-to-cart="enableAddToCart"
            :product="product"
            :current-variant="currentVariant"
            :quick-view-text='$t("searchResults.listViewProductItem.quickView")'
            :select-options-text='$t("searchResults.listViewProductItem.selectOptions")'
            :add-to-cart-text='$t("searchResults.listViewProductItem.addToCart")'
            :read-more-text='$t("searchResults.listViewProductItem.readMore")'
            :button-design-desktop="productButtonDesignDesktop"
            :button-design-mobile="productButtonDesignMobile"
          />
          <!-- product size -->
          <fs-product-sizes
           v-if="productSizeEnable"
           :product="product"
           :show-type="productSizeShowType"
           :size-variant-names="productSizeOptionNames"
           :color="productSizeColor"
           :font-size="productSizeFontSize"
           :font-weight="productSizeFontWeight"
          />
        </div>
      </fs-col>
      <fs-col
        :xl="16"
        :lg="16"
        :md="16"
        :sm="16"
        :xs="16"
        class="fs-sr-list-item__col--center-newdesign"
      >
        <div class="fs-sr-list-item__info">
          <!-- Title -->
          <fs-product-title
            :url="product.url"
            :title="product.title"
            class="fs-sr-list-item__title"
          />
          <!-- Review rate -->
          <fs-sr-review-rate
            v-if="enableReviewRating"
            class="fs-sr-list-item__review-rate"
            :count="product.reviewCount"
            :rate="product.reviewRatings"
            :reviews-text='$t("searchResults.listViewProductItem.rateReviews")'
            :review-text='$t("searchResults.listViewProductItem.rateReview")'
            :no-reviews-text='$t("searchResults.listViewProductItem.rateNoReviews")'
          />
          <!-- Price -->
        <fs-price-range
          v-if="enablePrice"
          class="fs-sr-item__price fs-sr-list-item__price"
          :price-varies="priceVaries"
          :on-sale="onSale"
          :price-min="product.priceMin"
          :price-max="product.priceMax"
          :compare-at-price-min="product.compareAtPriceMin"
          :enable-compare-at-price="enableCompareAtPrice"
          data-testid-prefix="sr"
        />
          <!-- Vendor -->
          <fs-product-vendor
            v-if="enableVendor"
            :vendor="product.vendor"
            class="fs-sr-list-item__vendor"
          />
          <!-- Description -->
          <fs-product-description
            v-if="enableDescription"
            class="fs-sr-list-item__description"
            :description="product.description"
          />
          <!-- product color -->
          <fs-product-colors
            v-if="productColorEnable"
            :product="product"
            :show-type="productColorShowType"
            :swatch-layout-type="productColorSwatchLayoutType"
            :swatch-size="productColorSwatchSize"
            :swatch-style="productColorSwatchStyle"
            :color-variant-names="productColorOptionNames"
            :enable-show-more="productColorShowMoreEnable"
            :show-more-limit="productColorShowMoreLimit"
            :show-more-action="productColorShowMoreAction"
         />
        </div>
      </fs-col>
    </fs-row>
  </div>
</fs-col>
    `,

  "fs-search-results-items": `
<fs-row class="fs-sr-items">
  <template v-if="isLoading && !isListView">
    <fs-col
      class="fs-sr-item-wrapper"
      :xl="gridViewDesktopColl"
      :lg="gridViewDesktopColl"
      :md="gridViewTabletColl"
      :sm="gridViewMobileColl"
      :xs="gridViewMobileColl"
      v-for="index in [...Array(12).keys()]"
      :key="index"
    >
      <fs-skeleton-product-image />
      <fs-skeleton-product-title />
      <fs-skeleton-product-text />
    </fs-col>
  </template>
  <template v-else-if="isLoading && isListView">
    <fs-col
      class="fs-sr-item-wrapper fs-sr-list-item-wrapper"
      :xl="24"
      :lg="24"
      :md="24"
      :sm="24"
      :xs="24"
      v-for="index in [...Array(4).keys()]"
      :key="index"
    >
      <div class="fs-sr-list-item">
        <fs-row class="fs-sr-list-item__inner">
          <fs-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24" class="fs-sr-list-item__col--left">
            <fs-skeleton-product-image class="fs-sr-list-item__skeleton-product-image"/>
          </fs-col>
          <fs-col
            :xl="12"
            :lg="12"
            :md="12"
            :sm="24"
            :xs="24"
            class="fs-sr-list-item__col--center"
          >
            <h3 class="fs-sr-list-item__title">
              <fs-skeleton-product-title class="fs-sr-list-item__skeleton-product-title" />
            </h3>
            <div class="fs-sr-list-item__vendor">
              <fs-skeleton-product-text />
            </div>
            <div class="fs-sr-list-item__description">
              <div>
                <fs-skeleton-product-text />
              </div>
              <div>
                <fs-skeleton-product-text />
              </div>
            </div>
          </fs-col>
          <fs-col
            :xl="6"
            :lg="6"
            :md="6"
            :sm="24"
            :xs="24"
            class="fs-sr-list-item__col--right"
          >
            <fs-skeleton-product-text />
          </fs-col>
        </fs-row>
      </div>
    </fs-col>
  </template>
  <template v-else-if="isLoading === false && !isListView">
    <fs-search-results-grid-view-item
      v-for="(product, index) in searchResult.products"
      :key="index"
      :product="product"
    />
  </template>
  <template v-else-if="isLoading === false && isListView">
    <fs-search-results-list-view-item
      v-for="(product, index) in searchResult.products"
      :key="index"
      :product="product"
    />
  </template>
</fs-row>
    `,

    "fs-search-results-views": `
<div v-if="enable" class="fs-sr-views">
  <div class="fs-sr-views-screen fs-sr-views-screen--desktop">
    <span
      v-if="enableListView"
      @click.prevent="onSelectListView"
      class="fs-sr-view-item fs-sr-view-list"
      :class="{'fs-sr-view-item--active': isListView}"
    ></span>
    <template v-if="enableGridView">
      <span
        @click.prevent="onSelectGridView2"
        class="fs-sr-view-item fs-sr-view-grid-2"
        :class="{'fs-sr-view-item--active': isGridView2}"
      ></span>
      <span
        @click.prevent="onSelectGridView3"
        class="fs-sr-view-item fs-sr-view-grid-3"
        :class="{'fs-sr-view-item--active': isGridView3}"
      ></span>
      <span
        @click.prevent="onSelectGridView4"
        class="fs-sr-view-item fs-sr-view-grid-4"
        :class="{'fs-sr-view-item--active': isGridView4}"
      ></span>
      <span
        v-if="!isVerticalLeftLayout"
        @click.prevent="onSelectGridView6"
        class="fs-sr-view-item fs-sr-view-grid-6"
        :class="{'fs-sr-view-item--active': isGridView6}"
      ></span>
    </template>
  </div>

  <div class="fs-sr-views-screen fs-sr-views-screen--tablet">
    <span
      v-if="enableListView"
      @click.prevent="onSelectListView"
      class="fs-sr-view-item fs-sr-view-list"
      :class="{'fs-sr-view-item--active': isListView}"
    ></span>
    <template v-if="enableGridView">
      <span
        @click.prevent="onSelectGridView2"
        class="fs-sr-view-item fs-sr-view-grid-2"
        :class="{'fs-sr-view-item--active': isGridView2}"
      ></span>
      <span
        @click.prevent="onSelectGridView3"
        class="fs-sr-view-item fs-sr-view-grid-3"
        :class="{'fs-sr-view-item--active': isGridView3}"
      ></span>
      <span
        @click.prevent="onSelectGridView4"
        class="fs-sr-view-item fs-sr-view-grid-4"
        :class="{'fs-sr-view-item--active': isGridView4}"
      ></span>
    </template>
  </div>

  <div class="fs-sr-views-screen fs-sr-views-screen--mobile">
    <span
      v-if="enableListView"
      @click.prevent="onSelectListView"
      class="fs-sr-view-item fs-sr-view-list"
      :class="{'fs-sr-view-item--active': isListView}"
    ></span>
    <template v-if="enableGridView">
      <span
        @click.prevent="onSelectGridView1"
        class="fs-sr-view-item fs-sr-view-grid-1"
        :class="{'fs-sr-view-item--active': isGridView1}"
      ></span>
      <span
        @click.prevent="onSelectGridView2"
        class="fs-sr-view-item fs-sr-view-grid-2"
        :class="{'fs-sr-view-item--active': isGridView2}"
      ></span>
    </template>
  </div>
</div>
    `,

  "fs-search-results-views-backup": `
<div v-if="enable">
  <div v-if="isLoading" class="fs-views">
    <fs-custom-skeleton class="fs-views__skeleton" />
  </div>
  <div v-else class="fs-views">
    <a
      v-if="enableGridView"
      :href="null"
      @click="onSelectGridView"
      class="fs-view__item fs-view__item--type-grid"
      :class="{'fs-view__item--status-active': viewType === 'grid'}"
      data-testid="sr-grid-view-icon"
    >
      <fs-app-store-outlined />
    </a>
    <a
      v-if="enableListView"
      @click="onSelectListView"
      class="fs-view__item fs-view__item--type-list"
      :class="{'fs-view__item--status-active': viewType === 'list'}"
      data-testid="sr-list-view-icon"
    >
      <fs-bars-outlined />
    </a>
  </div>
</div>
    `,

  "fs-custom-pagination": `
<div class="fs-sr-paging">
  <fs-pagination
    v-if="isPagination"
    :class="'fs-sr-pagination-' + paginationLayoutType"
    :default-current="1"
    :default-page-size="productsPerPage"
    :total="total"
    :current="current"
    @change="change"
    data-testid="sr-pa-pagination"
    hide-on-single-page
  >
  <template v-if="paginationLayoutType === 'layout-3'" #itemRender="{ page, type, originalElement }">
      <a v-if="type === 'next'" class="fs-pagination-item-link">
        {{$t("searchResults.pagination.next")}}
      </a>
      <a v-if="type === 'prev'" class="fs-pagination-item-link">
        {{$t("searchResults.pagination.prev")}}
      </a>
      <renderVNode v-else :vnode="originalElement"></renderVNode>
    </template>
  </fs-pagination>
  <div v-else-if="isLoadMore && hasNextPage" class="fs-load-more-paging" data-testid="sr-pa-load-more">
    <fs-spin
      v-if="isLoadMoreFetching"
      size="large"
      :indicator="indicator"
      data-testid="sr-pa-load-more-loading-icon"
    />
    <div v-else>
      <div
        class="fs-load-more-paging__title"
        data-testid="sr-pa-load-more-title"
      >
        {{$t("searchResults.pagination.loadMoreTotal", {current: currentNumOfProducts, total: total})}}
      </div>
      <fs-button
        class="fs-load-more-paging__button"
        @click="loadMore"
        data-testid="sr-pa-load-more-btn"
      >
        {{$t("searchResults.pagination.loadMore")}}
      </fs-button>
    </div>
  </div>
  <div
    v-else-if="isInfiniteLoading && hasNextPage"
    :ref="ref => infiniteLoadingRef = ref"
    class="fs-load-more-paging"
    data-testid="sr-pa-infinite-loading"
  >
    <fs-spin v-if="isLoadMoreFetching" size="large" :indicator="indicator" />
  </div>
  </div>
  `,

  "fs-skeleton-product-image": `
<fs-custom-skeleton class="fs-skeleton-product-image" />
  `,

  "fs-skeleton-product-title": `
<fs-custom-skeleton class="fs-skeleton-product-title" />
  `,

  "fs-skeleton-product-text": `
<fs-custom-skeleton class="fs-skeleton-product-text" />
  `,
};

flashsearch.instantSearchTemplates = {
  "fs-app": `
<fs-config-provider prefixCls="fs">
  <div id="fs-instant-search">
    <fs-instant-search-desktop
      v-for="inputElem in inputElems"
      :input-elem="inputElem"
      :settings="settings"
    />
  </div>
  <fs-instant-search-mobile :settings="settings" />
</fs-config-provider>
    `,

  "fs-instant-search": `
<div
  :ref="ref => isWrapperRef = ref"
  v-show="enablePopup"
  class="fs-is-wrapper"
  :class="{'fs-is--layout-vertical': isVerticalLayout}"
  :style="isStyles"
  @touchmove="() => document.activeElement.blur()"
  data-testid="is-wrapper"
>
  <div class="fs-is_inner">
    <div class="fs-is-cols">
      <div class="fs-is-col">
        <template v-for="(part, index) in partsOfResults">
          <fs-is-suggestions
            :key="index"
            v-if="shouldShowSuggestionsPart(part)"
            :isNotEmpty="isSuggestionsNotEmpty"
            :suggestResults="suggestResults"
          />
          <fs-is-collections
            :key="index"
            v-if="shouldShowCollectionsPart(part)"
            :isNotEmpty="isCollectionsNotEmpty"
            :suggestResults="suggestResults"
          />
          <fs-is-pages
            :key="index"
            v-if="shouldShowPagesPart(part)"
            :isNotEmpty="isPagesNotEmpty"
            :suggestResults="suggestResults"
          />
          <fs-is-product-items
            :key="index"
            v-if="shouldShowProductsPart(part)"
            :isNotEmpty="isProductsNotEmpty"
            :suggestResults="suggestResults"
          />
        </template>
      </div>
      <div class="fs-is-col">
        <fs-is-product-items
          v-if="shouldShowProductsPartForVerticalLayout"
          :isNotEmpty="isProductsNotEmpty"
          :suggestResults="suggestResults"
        />
        <div
          class="fs-is__view-all-results-wrapper"
          v-if="showViewAllResults"
          data-testid="is-view-all"
        >
          <fs-is-item :url="'/search?q=' + suggestResults.query">
            <div class="fs-is__view-all-results__text-wrapper">
            <i18n-t
              keypath="instantSearch.messages.viewAllResults"
              tag="span"
              class="fs-is__view-all-results__text"
              data-testid="is-view-all-text"
            >
              <template #searchTerm>
                <span
                  class="fs-is__view-all-results__query"
                  data-testid="is-view-all-st"
                >
                  {{suggestResults.query}}
                </span>
              </template>
            </i18n-t>
            </div>
          </fs-is-item>
        </div>
      </div>
    </div>
    <!-- Did you mean -->
    <fs-is-did-you-mean
      v-if="!isProductsNotEmpty"
      :suggest-results="suggestResults"
    />
    <!-- Empty page -->
    <div
      v-show="showEmptyPage"
      class="fs-is-empty-page"
      data-testid="is-not-found"
    >
      <i18n-t keypath="instantSearch.messages.nothingFound" tag="span">
        <template #searchTerm>
          <span
            class="fs-is-empty-page__query"
            data-testid="is-not-found-st"
          >
            {{suggestResults.query}}
          </span>
        </template>
      </i18n-t>
    </div>
  </div>
</div>
    `,

  "fs-is-suggestions": `
<div v-if="isNotEmpty" class="fs-is-item-wrapper fs-is-suggestions-wrapper">
  <fs-is-item-label :label='$t("instantSearch.labels.popularSuggestions")' />
  <fs-is-suggestion-item
    v-for="(suggestion, index) in suggestResults.suggestions"
    :key="index"
    :url="'/search?q=' + suggestion"
    :query="suggestResults.query"
    :text="suggestion"
    data-testid="is-product-suggestion"
  />
</div>
  `,

  "fs-is-collections": `
<div v-if="isNotEmpty" class="fs-is-item-wrapper fs-is-collections-wrapper">
  <fs-is-item-label :label='$t("instantSearch.labels.collections")' />
  <fs-is-suggestion-item
    v-for="(collection, index) in suggestResults.collections"
    :key="index"
    :url="'/collections/' + collection.handle"
    :query="suggestResults.query"
    :text="collection.title"
    data-testid="is-product-collection"
  />
</div>
  `,

  "fs-is-pages": `
<div  v-if="isNotEmpty" class="fs-is-item-wrapper fs-is-pages-wrapper">
  <fs-is-item-label :label='$t("instantSearch.labels.pages")'/>
  <fs-is-suggestion-item
    v-for="(page, index) in suggestResults.pages"
    :key="index"
    :url="'/pages/' + page.handle"
    :query="suggestResults.query"
    :text="page.title"
    data-testid="is-product-page"
  />
</div>
  `,

  "fs-is-product-items": `
<div v-if="isNotEmpty" class="fs-is-item-wrapper fs-is-product-items-wrapper">
  <fs-is-item-label :label='$t("instantSearch.labels.products")'/>
  <fs-is-did-you-mean :suggest-results="suggestResults"/>
  <div class="fs-is-product-items-container">
    <fs-is-product-item
      v-for="(product, index) in suggestResults.products"
      :key="index"
      :product="product"
    />
  </div>
</div>
  `,

  "fs-is-product-item": `
<fs-is-item
  :url="product.url"
  class="fs-is-product-item"
  data-testid="is-product"
  @onClickItem="onClickItem"
>
  <!-- Image -->
  <div
    v-if="enableImage"
    class="fs-is-product-image-wrapper"
    data-testid="is-product-image"
  >
    <span class="fs-is-product-image-inner">
      <!-- Product label for vertical layout -->
      <fs-product-label
        v-if="isVerticalLayout"
        class="fs-is-product-label fs-is-product-item__product-label"
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
        :product="product"
        :current-variant="currentVariant"
        :enable-new-label="enableNewLabel"
        :shape="productLabelShape"
      />
      <img
        alt=""
        class="fs-is-product-image"
        :src="productImageWithSize"
      />
    </span>
  </div>
  <div class="fs-is-product-info fs-is-product-item__info">
    <div class="fs-is-product-item__info-head">
      <!-- Title -->
      <div class="fs-is-product-title fs-is-product-item__title" data-testid="is-product-title">
        {{product.title}}
      </div>
      <!-- Product label for horizontal layout -->
      <fs-product-label
        v-if="!isVerticalLayout"
        class="fs-is-product-label fs-is-product-item__product-label"
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
        :product="product"
        :current-variant="currentVariant"
        :enable-new-label="enableNewLabel"
        :shape="productLabelShape"
      />
    </div>
    <!-- Review rate -->
    <fs-is-review-rate
      v-if="enableReviewRating"
      class="fs-is-product-item__review-rate"
      :count="product.reviewCount"
      :rate="product.reviewRatings"
    />
    <!-- Sku -->
    <div
      v-if="!!sku && enableSku"
      class="fs-is-product-sku fs-is-product-item__sku"
      data-testid="is-product-sku"
    >
      {{$t("instantSearch.labels.sku")}}: {{sku}}
    </div>
    <!-- Vendor -->
    <div
      v-if="!!product.vendor && enableVendor"
      class="fs-is-product-vendor fs-is-product-item__vendor"
      data-testid="is-product-vendor"
    >
      {{product.vendor}}
    </div>
    <!-- Price -->
    <fs-price
      v-if="enablePrice"
      class="fs-is-product-item__price"
      :on-sale="onSale"
      :price="product.priceMin"
      :compare-at-price="product.compareAtPriceMin"
      :enable-compare-at-price="enableCompareAtPrice"
      data-testid-prefix="is"
    />
  </div>
</fs-is-item>
    `,

  "fs-is-did-you-mean": `
<div
  v-if="!!suggestResults.didYouMean"
  class="fs-is-dym-wrapper"
  data-testid="is-dym"
>
  <i18n-t keypath="instantSearch.messages.nothingFound" tag="span">
    <template #searchTerm>
      <span class="fs-is-dym__query" data-testid="is-dym-st"
      >{{suggestResults.query}}</span>
    </template>
  </i18n-t>
  <i18n-t keypath="instantSearch.messages.didYouMean" tag="span" class="fs-is-dym__text-wrapper">
    <template #suggestions>
      <span
        class="fs-is-dym__text"
        @mousedown.prevent=""
        @click.stop.prevent="selectDidYouMean"
        data-testid="is-dym-suggest-text"
      >{{suggestResults.didYouMean}}</span>
    </template>
  </i18n-t>
</div>
  `,

  "fs-instant-search-desktop": `
<fs-instant-search
  :settings="settings"
  :suggest-results="suggestResults"
  :enable="doesShowWidget"
  :input-elem="inputElem"
  :position="position"
/>
    `,

  "fs-instant-search-mobile": `
<div>
  <fs-is-searchbar-mobile
    :enable="enableSearchBar"
    v-model:query="query"
    @input="handleOnInput"
    @go-back="goBack"
    @key-down="handleOnKeyDown"
  />
  <fs-instant-search
    :settings="settings"
    :suggest-results="suggestResults"
    :enable="doesShowWidget"
    :input-elem="mSearchbarRef"
  />
</div>
    `,

  "fs-highlighter": `
<span
  v-for="(chunkItem, index) in chunkItems"
  :key="index"
  :class="chunkItem.className"
  :style="chunkItem.style"
>
  {{chunkItem.text}}
</span>
    `,

  "fs-highlight-text": `
<fs-highlighter
  :search-words="[searchWord]"
  :text-to-highlight="textToHighlight"
  unhighlight-class-name="fs-unhighlight-text"
  :highlight-style="{color: 'inherit'}"
/>
    `,

  "fs-is-suggestion-item": `
<fs-is-item
  class="fs-is-item--type-suggestion"
  :url="url"
>
  <fs-highlight-text
    :search-word="query"
    :text-to-highlight="text"
  />
</fs-is-item>
  `,

  "fs-is-item": `
<div @click="onClickItem" class="fs-is-item">
  <slot />
</div>
    `,

  "fs-is-item-label": `
<div class="fs-is-item-label" data-testid="is-label">{{ label }}</div>
  `,

  "fs-is-review-rate": `
<div class="fs-is-review-rate" data-testid="is-review-rate">
  <fs-review-rate
    class="fs-is-review-rate__review-rate"
    allow-half
    :value="rate"
  />
</div>
  `,

  "fs-is-searchbar-mobile": `
<div
  id="fs-is-searchbar-mobile"
  class="fs-is-searchbar-mobile-wrapper"
  v-show="enable"
>
  <div class="fs-is-searchbar-mobile__background" />
  <div class="fs-is-searchbar-mobile__input-wrapper">
    <div
      class="fs-is-searchbar-mobile__back-icon"
      @click.prevent="goBack"
    >
      <fs-arrow-left-outlined />
    </div>
    <div class="fs-is-searchbar-mobile__input-form-wrapper">
      <form>
        <fs-search-outlined/>
        <input
          class="fs-is-searchbar-mobile__input"
          :ref="el => inputRef = el"
          :value="query"
          :placeholder="$t('instantSearch.messages.searchInputPlaceholder')"
          @input="onChangeInputText"
          @keydown="onKeyDown"
          data-testid="is-mobile-search-box"
        />
        <fs-close-outlined
          @click="onClearAllInputText"
          v-if="!disableClearIcon"
        />
      </form>
    </div>
  </div>
</div>
    `,
};

/*
You can add any functions, variables ... like normal javascript codes
And use it on every templates above
Examples:
- Define a function:
    function getImageSize() {};
- And using this function on templates:
    <img>{{getImageSize(product.url)}}</img>
 */

flashsearch.event.on("initSearchResults", function (app) {
  /*
  You can create a component and using it on search results templates.
  Examples:
  - Create a component for "Search results" area:
      app.createComponent("fs-my-custom", {
          template: `<h2>this is my custom component</h2>`
      })
  - Then using it on search results templates:
      <fs-my-custom/>
  - Or event with more complex component with props:
      app.createComponent("fs-my-custom", {
          props: {msg: String},
          template: `<h2>here is my message: {{msg}}</h2>`
      })
   */
});

flashsearch.event.on("initInstantSearch", function (app) {
  /*
  You can create a component and using it on Instant search templates.
  Examples:
  - Create a component for "Instant search" area:
      app.createComponent("fs-my-custom", {
          template: `<h2>this is my custom component</h2>`
      })
  - Then using it on Instant search templates:
      <fs-my-custom/>
  - Or event with more complex component with props:
      app.createComponent("fs-my-custom", {
          props: {msg: String},
          template: `<h2>here is my message: {{msg}}</h2>`
      })
   */
});

