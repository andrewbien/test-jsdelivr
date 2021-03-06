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
  <span v-if="priceVaries" class="fs-price--type-regular">
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

  "fs-skeleton": `
<a-skeleton active :paragraph="{rows: count, width: width}" :title="false"/>
    `,
};

flashsearch.searchResultsTemplates = {
  "fs-app": `
<fs-config-provider prefixCls="fs">
    <router-view></router-view>
</fs-config-provider>
    `,

  "fs-main": `
<div
  id="fs-main-container"
  class="fs-container"
  :style="srStyles"
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
        class="fs-main__toolbar"
        :is-filter-icon-opened="isFilterIconOpened"
        :is-loading="isSearchLoading"
        :total-products="totalProducts"
        :view-type="viewType"
        @collapse-filters="collapseFilters"
        @on-mobile-filters-icon-click="onMobileFiltersIconClick"
        @on-select-grid-view="onSelectGridView"
        @on-select-list-view="onSelectListView"
      />
      <!-- Filters section: horizontal layout -->
      <fs-horizontal-filters-section
        :search-result="searchResult"
        :collapse-active-key="collapseActiveKey"
        :should-show-mobile-filter="shouldShowMobileFilter"
        @close-mobile-filters="closeMobileFilters"
        @show-results="showResults"
      />
    </fs-layout>
    <!-- Filter by: horizontal layout only -->
    <fs-layout v-if="isHorizontalLayout">
      <fs-filter-by :is-loading="isSearchLoading" />
    </fs-layout>
    <fs-layout>
      <!-- Filters section: vertical layout -->
      <fs-layout-sider v-if="isVerticalLeftLayout" :width="270">
        <fs-vertical-filters-section :is-loading="isSearchLoading" :searchResult="searchResult"/>
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
        <div class="fs-sr-wrapper">
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
          :get-container="() => document.getElementById('fs-main-container')"
        />
      </fs-layout-content>
    </fs-layout>
  </fs-layout>
</div>
    `,

  "fs-collection-header": `
<div class="fs-collection-header" data-testid="sr-collection-header">
  {{header ? header : $t("searchResults.collectionPageHeader.products")}}
</div>
  `,

  "fs-search-section": `
<div class="fs-search-section-wrapper">
  <!-- Skeleton: Search header -->
  <div
    v-if="isLoading && enableSearchPageHeader"
    class="fs-search-section-wrapper"
  >
    <h1 class="fs-search-result-header">
      <fs-skeleton class="fs-skeleton-search-result-header" />
    </h1>
  </div>
  <!-- Search result header -->
  <h1
    v-else-if="enableSearchPageHeader"
    class="fs-search-result-header"
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
        class="fs-toolbar__sort-by--right"
        :is-loading="isLoading"
      />
      <fs-search-results-views
        :view-type="viewType"
        @on-select-grid-view="onSelectGridView"
        @on-select-list-view="onSelectListView"
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

  "fs-vertical-filters-section": `
<div
  class="fs-filters-section fs-vertical-filters-section"
>
  <fs-filter-by clear-all-btn-position="label" :is-loading="isLoading" />
  <fs-filters
    :filters="searchResult.filters"
    :show-collapse="true"
    :is-loading="isLoading"
  />
</div>
  `,

  // Filters
  "fs-horizontal-filters-section": `
<div
  class="fs-filters-section fs--hirozontal-filters-section"
  :class="{'fs-filters-section--visible': collapseActiveKey === '1'}"
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
<div
  class="fs-filters-section"
  :class="{'fs-filters-section--visible': collapseActiveKey === '1'}"
>
  <fs-drawer
    class="fs-filters-section-inner--mobile"
    placement="left"
    :closable="true"
    @close="closeMobileFilters"
    :visible="shouldShowMobileFilter"
  >
    <template #title>
      <span class="fs-filters-title-wrapper">
        <span class="fs-filters-title">{{$t("searchResults.filter.filtersTitle")}}</span>
        <fs-button-clear-all-filter-options type="text" />
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
  :visible="visible"
  option-test-id="filter-by-option-each-filter"
/>
    `,

  "fs-filter-by": `
<div v-if="isLoading" class="fs-filter-by" :style="{'margin-left': 0}">
  <div class="fs-filter-by__top">
    <div class="fs-filter-by__label">
      <fs-skeleton class="fs-filter-by__skeleton-label" />
    </div>
  </div>
  <div class="fs-filter-by__bottom">
    <fs-skeleton class="fs-filter-by__skeleton-bottom" :count="2" />
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
        <fs-skeleton class="fs-filter__title__skeleton" />
      </h5>
    </div>
    <fs-skeleton class="fs-filter__skeleton" :count="4" />
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
        v-show="!isFilterEmpty(filter)"
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
              v-else-if="shouldShowClearBtn(filter)"
              @clear="clearFilter(filter)"
            />
          </div>
        </template>
        <fs-filter :filter="filter" :isMobile="isMobile" />
        <fs-button-clear-filter-option
          v-if="isMobile && shouldShowClearBtn(filter)"
          @clear="clearFilter(filter)"
        />
      </fs-collapse-panel>
    </template>
  </fs-collapse>
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
          v-if="shouldShowClearBtn(filter)"
          @clear="clearFilter(filter)"
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
/>
<fs-filter-review-rating
  v-else-if="isReviewRatingFilter"
  :filter="filter"
  :is-mobile="isMobile"
/>
<fs-filter-stock-status
  v-else-if="isStockStatusFilter"
  :filter="filter"
  :is-mobile="isMobile"
/>
<fs-filter-list
  v-else-if="isRangeFilterWithDisplayTypeList"
  :filter="filter"
  :is-mobile="isMobile"
/>
<fs-filter-range
  v-else-if="isRangeFilterWithDisplayTypeRange"
  :filter="filter"
  :is-mobile="isMobile"
/>
<fs-filter-list
  v-else-if="isListFilter"
  :filter="filter"
  :is-mobile="isMobile"
/>
<fs-filter-box v-else-if="isBoxFilter" :filter="filter" :is-mobile="isMobile" />
<fs-filter-swatch
  v-else-if="isSwatchFilter"
  :filter="filter"
  :is-mobile="isMobile"
/>
    `,

  // Filter types
  "fs-filter-collection": `
<div
  class="fs-filter__content fs-filter__content--list fs-filter-collection__content"
  :class="{'fs-filter--screen-mobile': isMobile}"
>
  <div class="fs-filter__content">
    <fs-input
      v-if="shouldShowSearchBox"
      class="fs-filter__searchbox"
      @change="onSearch"
      placeholder="Search options"
      :value="query"
      data-testid="filter-searchbox"
    />
    <div
      class="fs-filter__content-inner"
      :class="{'fs-filter__content-inner--scrollable': shouldUseScrollbar}"
      data-testid="filter-content"
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
              @on-select-option="onClickItem(item)"
            />
          </template>
          <fs-filter-sub-collection
            :filter="filter"
            :sub-collections="getSubCollections(item.value)"
            :parent-collection="item"
            :should-reset-selected-item="shouldResetChild(item)"
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
        />
      </template>
    </div>
    <fs-button-view-more-filter-options
      v-if="shouldUseViewMore && getFilterValues(query).length > 5"
      :on-view-more-status="onViewMoreStatus"
      @view-more="viewMore"
    />
  </div>
</div>
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
    @on-select-option="onClickItem(item)"
    data-testid="sub-option"
    :label-data-testid="buildTestId(index)"
  />
</template>
    `,

  "fs-filter-list": `
<div
  class="fs-filter__content fs-filter__content--list"
  :class="{'fs-filter__content--multiple-list': filter.multipleSelection}"
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
    class="fs-filter__content-inner"
    :class="{'fs-filter__content-inner--scrollable': shouldUseScrollbar}"
    data-testid="filter-content"
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
        :is-selected-option="isSelectedOptions(value)"
        @on-select-option="selectOption(value)"
      />
    </template>
  </div>
  <fs-button-view-more-filter-options
    v-if="shouldUseViewMore && getFilterValues(query).length > 5"
    :on-view-more-status="onViewMoreStatus"
    @view-more="viewMore"
  />
</div>
    `,

  "fs-filter-box": `
<div class="fs-filter__content">
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
    :class="{'fs-filter__content-inner--scrollable': shouldUseScrollbar}"
    data-testid="filter-content"
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
  <fs-button-view-more-filter-options
    v-if="shouldUseViewMore && getFilterValues(query).length > 4"
    :on-view-more-status="onViewMoreStatus"
    @view-more="viewMore"
  />
</div>
    `,

  "fs-filter-range": `
<div class="fs-filter__content fs-filter__content--range">
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
    `,

  "fs-filter-review-rating": `
<div
  class="fs-filter__content fs-filter__content--list"
  :class="{'fs-filter__content--multiple-list': shouldDisplaySelectedRatingOnly && filter.multipleSelection}"
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
    `,

  "fs-filter-stock-status": `
<div
  class="fs-filter__content fs-filter__content--list fs-filter__content--multiple-list"
>
  <div class="fs-filter__content-inner" data-testid="filter-content">
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
    `,

  "fs-filter-swatch": `
<div class="fs-filter__content">
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
    :class="{'fs-filter__content-inner--scrollable': shouldUseScrollbar}"
    data-testid="filter-content"
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
    />
    <fs-button-view-more-filter-options
      v-if="shouldUseViewMore && getFilterValues(query).length > (isMobile ? 5 : 20)"
      :on-view-more-status="onViewMoreStatus"
      @view-more="viewMore"
    />
  </div>
</div>
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
      class="fs-filter-option__value fs-filter-box-option__value"
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
<span
  class="fs-filter-option"
  :class="{'fs-filter-option--single-list': !multiple, 'fs-filter-option--multiple-list': multiple, 'fs-filter-option--selected': isSelected}"
  @click.prevent="onSelect"
  data-testid="option"
  role="checkbox"
  :aria-checked="isSelected ? 'true' : 'false'"
>
  <span v-if="label !== undefined" class="fs-filter-option__value" :data-testid="labelDataTestid">
    {{label}}
  </span>
  <fs-filter-option-amount v-if="count !== undefined" :count="count" />
</span>
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
  <span class="fs-filter-option__value">
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
  :title="label + ' ' + '(' + count + ')'"
  :mouse-leave-delay="0"
  :mouse-enter-delay="1"
  overlay-class-name="fs-filter-option__tooltip"
>
  <a
    @click.prevent="onSelect"
    class="fs-filter-option fs-filter-swatch-option__option"
    :class="{'fs-filter-option--selected': isSelected}"
    role="checkbox"
    :aria-checked="isSelected ? 'true' : 'false'"
    data-testid="option"
  >
    <span class="fs--filter-swatch-option__col-left">
      <span
        class="fs-filter-swatch-option__image"
        :class="{'fs-filter-swatch-option__image--selected': isSelected}"
        :style="imageUrl ? {'background-image': 'url(' + imageUrl + ')'} : {'background-color': hex}"
      />
      <span
        class="fs-filter-option__value fs-filter-swatch-option__value"
        data-testid="option-value"
      >
        {{label}}
      </span>
    </span>
    <span class="fs-filter-swatch-option__col-right">
      <fs-filter-option-amount :count="count" />
    </span>
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
  // End filter types

  "fs-filters-icon": `
<div v-if="enable && isLoading" class="fs-filters-icon-wrapper">
  <div v-if="isHorizontalLayout" class="fs-filters-icon">
    <fs-skeleton class="fs-filters-icon__skeleton" />
  </div>
  <div class="fs-filters-icon fs-filters-icon--mobile">
    <fs-skeleton class="fs-filters-icon__skeleton--mobile" />
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
  {{onViewMoreStatus ? $t("searchResults.filter.viewLess") : $t("searchResults.filter.viewMore")}}
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
  <fs-skeleton class="fs-total-products__skeleton" />
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
    <fs-skeleton class="fs-sort-by__skeleton-content" />
  </div>
  <div class="fs-sort-by__mobile-content">
    <fs-skeleton class="fs-sort-by__skeleton-mobile-content" />
  </div>
</div>
<div
  v-else-if="enable"
  id="fs-sr-toolbars-sort-by"
  class="fs-sort-by"
  v-bind="$attrs"
  data-testid="sr-sort-by"
>
  <div class="fs-sort-by__content" data-testid="sr-sort-by-select">
    <fs-select
      size="large"
      v-model:value="sortBy"
      @change="changeSortByDesktop"
      :get-popup-container="() => document.getElementById('fs-sr-toolbars-sort-by')"
    >
      <fs-select-option
        v-for="({value, label}, index) in sortByList"
        :key="index"
        :value="value"
        data-testid="sr-sort-by-option"
        class="fs-sort-by__option"
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
      :get-container="() => document.getElementById('fs-sr-toolbars-sort-by')"
    >
      <template v-slot:title>
        <span class="fs-sort-by__title" data-testid="sr-sort-by-title">Sort by</span>
      </template>
      <div class="fs-sort-by__mobile-content-inner">
        <span
          v-for="({value, label}, index) in sortByList"
          :key="index"
          class="fs-sort-by__item"
          :class="{'fs-sort-by__item--selected': sortBy === value}"
          @click.prevent="changeSortByMobile(value)"
          data-testid="sr-sort-by-option"
          :aria-selected="sortBy === value ? 'true' : 'false'"
        >
          {{label}}
        </span>
      </div>
    </fs-drawer>
  </div>
</div>
    `,

  "fs-product-buttons": `
<div class="fs-product-button-wrapper">
  <a
    v-if="enableQuickView"
    class="fs-product-button fs-product-button--type-quick-view"
    rel="nofollow"
    @click="showQuickView"
    data-testid="sr-quick-view-btn"
  >
    <fs-eye-outlined class="fs-product-button__icon" />
    <span class="fs-product-button__text" data-testid="sr-quick-view-text">{{quickViewText}}</span>
  </a>
  <span v-if="product.availableForSale && enableAddToCart">
    <a
      v-if="product.variants.length > 1"
      class="fs-product-button fs-product-button--type-atc"
      :href="product.url"
      rel="nofollow"
      data-testid="sr-atc-btn"
      @click="onSelectOptions"
    >
      <fs-shopping-cart-outlined class="fs-product-button__icon" />
      <span class="fs-product-button__text" data-testid="sr-atc-text">{{selectOptionsText}}</span>
    </a>
    <form
      v-else
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
  </span>
  <a
    v-else-if="enableAddToCart"
    class="fs-product-button fs-product-button--type-atc"
    :href="product.url"
    rel="nofollow"
    data-testid="sr-atc-btn"
    @click="onReadMore"
  >
    <fs-info-circle-outlined class="fs-product-button__icon" />
    <span class="fs-product-button__text" data-testid="sr-atc-text">{{readMoreText}}</span>
  </a>
</div>
    `,

  "fs-product-image": `
<a class="fs-product-image__main-image-wrapper" :href="productUrl">
  <div
    class="fs-product-image__main-image"
    :style="{'padding-top': '127.586%', 'background-image': 'url(' + mainProductImage + ')'}"
  />
</a>
<div
  v-if="secondProductImage"
  class="fs-product-image__hover-image-wrapper"
>
  <div
    class="fs-product-image__hover-image"
    :style="{'padding-top': '127.586%', 'background-image': 'url(' + secondProductImage + ')'}"
  />
</div>
    `,

  "fs-product-label": `
<span class="fs-label-wrapper">
  <span
    v-if="!availableForSale && enableSoldOutLabel"
    class="fs-label fs-label--soldOut"
    :data-testid="soldOutDataTestid"
  >
    {{soldOutText}}
  </span>
  <span
    v-else-if="onSale && enableSaleLabel"
    class="fs-label fs-label--onSale"
    :data-testid="saleDataTestid"
  >
    {{saleText}}
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
<div class="fs-ellipsis-text fs-product-description" v-html="description" data-testid="sr-product-desc"/>
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
        class="fs-label--top-left fs-quickview__product-label"
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
        sold-out-data-testid="sr-qv-product-label-sold-out"
        sale-data-testid="sr-qv-product-label-sale"
        :sold-out-text='$t("searchResults.quickView.soldOutLabel")'
        :sale-text='$t("searchResults.quickView.saleLabel")'
      />
      <fs-carousel arrows dot-position="top" :ref="el => caroRef = el">
        <template #prevArrow>
          <div
            class="fs-quickview__slick-arrow"
            :style="{left: '10px', 'z-index': 2}"
          >
            <fs-left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="fs-quickview__slick-arrow" style="right: 10px">
            <fs-right-circle-outlined />
          </div>
        </template>
        <div v-for="(image, index) in product.images" :key="index">
          <div class="fs-quickview-thumbs-item-wrapper">
            <span
              class="fs-quickview-thumbs-item"
              :style="{'padding-top': '127.586%', 'background-image': 'url(' + fsUtils.getSizedImageUrl(image.originalSrc, '540x') + ')', 'background-repeat': 'no-repeat'}"
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
            <fs-select size="large" v-model:value="formState[option.name]" :get-popup-container="() => document.getElementById('fs-main-container')" data-testid="sr-qv-options-select">
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
          <fs-row>
            <fs-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
              <fs-form-item name="quantity" :label="$t('searchResults.quickView.quantity')">
                <fs-input-number
                  size="large"
                  :min="1"
                  v-model:value="formState.quantity"
                  class="fs-quickview__quantity"
                />
              </fs-form-item>
            </fs-col>
            <fs-col :xl="16" :lg="16" :md="16" :sm="16" :xs="16">
              <fs-form-item>
                <fs-button
                  v-if="isCurrentVariantAvailable"
                  class="fs-quickview__add-to-cart-btn"
                  html-type="submit"
                  size="large"
                  :loading="qvSubmitLoading"
                  data-testid="sr-qv-atc-btn"
                >
                  {{$t("searchResults.quickView.addToCart")}}
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
            </fs-col>
          </fs-row>
        </fs-form>
        <fs-button
          v-else
          size="large"
          class="fs-quickview__add-to-cart-btn"
          :disabled="true"
          data-testid="sr-qv-disabled-btn"
        >
          {{$t("searchResults.quickView.soldOutButton")}}
        </fs-button>
      </div>
    </fs-col>
  </fs-row>
</fs-modal>
    `,

  "fs-search-results-grid-view-item": `
<fs-col
  :xl="isHorizontalLayout ? 6 : 8"
  :lg="isHorizontalLayout ? 6 : 8"
  :md="isHorizontalLayout ? 6 : 8"
  :sm="12"
  :xs="12"
  class="fs-sr-item-wrapper fs-sr-grid-item-wrapper"
  data-testid="grid-view-item"
  @click="onClickItem"
>
  <div class="fs-sr-grid-item">
    <!-- Image -->
    <div
      class="fs-sr-item__image-wrapper fs-sr-grid-item__image-wrapper"
    >
      <fs-product-label
        class="fs-label--top-left fs-sr-grid-item__product-label"
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
        :sold-out-text='$t("searchResults.gridViewProductItem.soldOut")'
        :sale-text='$t("searchResults.gridViewProductItem.sale")'
      />
      <fs-product-image
        :product-url="product.url"
        :main-product-image="mainProductImage"
        :second-product-image="secondProductImage"
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
  class="fs-sr-item-wrapper fs-sr-list-item-wrapper"
  data-testid="list-view-item"
  @click="onClickItem"
>
  <div class="fs-sr-list-item">
    <fs-row class="fs-sr-list-item__inner">
      <fs-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24" class="fs-sr-list-item__col--left">
        <!-- Image -->
        <div
          class="fs-sr-item__image-wrapper fs-sr-list-item__image-wrapper"
        >
          <fs-product-label
            class="fs-label--top-left fs-sr-list-item__product-label"
            :available-for-sale="product.availableForSale"
            :on-sale="onSale"
            :enable-sold-out-label="enableSoldOutLabel"
            :enable-sale-label="enableSaleLabel"
            :sold-out-text='$t("searchResults.listViewProductItem.soldOut")'
            :sale-text='$t("searchResults.listViewProductItem.sale")'
          />
          <fs-product-image
            :product-url="product.url"
            :main-product-image="mainProductImage"
            :second-product-image="secondProductImage"
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
          />
        </div>
      </fs-col>
      <fs-col
        :xl="12"
        :lg="12"
        :md="12"
        :sm="24"
        :xs="24"
        class="fs-sr-list-item__col--center"
      >
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
      </fs-col>
      <fs-col
        :xl="6"
        :lg="6"
        :md="6"
        :sm="24"
        :xs="24"
        class="fs-sr-list-item__col--right"
      >
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
      </fs-col>
    </fs-row>
  </div>
</fs-col>
    `,

  "fs-search-results-items": `
<fs-row class="fs-sr-items">
  <template v-if="isLoading && viewType === 'grid'">
    <fs-col
      class="fs-sr-item-wrapper"
      :xl="isHorizontalLayout ? 6 : 8"
      :lg="isHorizontalLayout ? 6 : 8"
      :md="isHorizontalLayout ? 6 : 8"
      :sm="12"
      :xs="12"
      v-for="index in [...Array(isHorizontalLayout ? 4 : 3).keys()]"
      :key="index"
    >
      <fs-skeleton-product-image />
      <fs-skeleton-product-title />
      <fs-skeleton-product-text />
    </fs-col>
  </template>
  <template v-else-if="isLoading && viewType === 'list'">
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
  <template v-else-if="isLoading === false && viewType === 'grid'">
    <fs-search-results-grid-view-item
      v-for="(product, index) in searchResult.products"
      :key="index"
      :product="product"
    />
  </template>
  <template v-else-if="isLoading === false && viewType === 'list'">
    <fs-search-results-list-view-item
      v-for="(product, index) in searchResult.products"
      :key="index"
      :product="product"
    />
  </template>
</fs-row>
    `,

  "fs-search-results-views": `
<div v-if="enable">
  <div v-if="isLoading" class="fs-views">
    <fs-skeleton class="fs-views__skeleton" />
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
    :default-current="1"
    :default-page-size="productsPerPage"
    :total="total"
    :current="current"
    @change="change"
    data-testid="sr-pa-pagination"
  />
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
<fs-skeleton class="fs-skeleton-product-image" />
  `,

  "fs-skeleton-product-title": `
<fs-skeleton class="fs-skeleton-product-title" />
  `,

  "fs-skeleton-product-text": `
<fs-skeleton class="fs-skeleton-product-text" />
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
<div v-if="isNotEmpty" class="fs-is-suggestions-wrapper">
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
<div v-if="isNotEmpty" class="fs-is-collections-wrapper">
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
<div  v-if="isNotEmpty" class="fs-is-collections-wrapper">
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
<div v-if="isNotEmpty" class="fs-is-product-items-wrapper">
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
    <img
      alt=""
      class="fs-is-product-image"
      :src="product.featuredImage.originalSrc"
    />
  </div>
  <div class="fs-is-product-info">
    <!-- Title -->
    <div class="fs-is-product-title fs-is-product-item__title" data-testid="is-product-title">
      {{product.title}}
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
  :width="WIDGET_WIDTH"
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
<div @mousedown="onClickItem" class="fs-is-item">
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

flashsearch.event.on("init", function (app) {
  /*
  You can create a component and using it on every templates.
  Examples:
  - Create a component for "Search results" area:
      app.createComponent("fs-my-custom", {
          template: `<h2>this is my custom component</h2>`
      })
  - Then using it on any templates:
      <fs-my-custom/>
  - Or event with more complex component with props:
      app.createComponent("fs-my-custom", {
          props: {msg: String},
          template: `<h2>here is my message: {{msg}}</h2>`
      })
   */
});
