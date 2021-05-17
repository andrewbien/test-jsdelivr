flashsearch.commonTemplates = {
  "fs-price": `
<div v-if="enablePrice" class="flashsearch-price" :data-testid="buildDataTestId('price')">
  <span v-if="onSale && enableCompareAtPrice">
    <span
      class="flashsearch-price--type-sale"
      v-html="fsUtils.formatDisplayMoney(compareAtPrice)"
      :data-testid="buildDataTestId('ca-price')"
    />
    <span
      class="flashsearch-price--type-origin"
      v-html="fsUtils.formatDisplayMoney(price)"
    />
  </span>
  <span
    v-else
    class="flashsearch-price--type-regular"
    v-html="fsUtils.formatDisplayMoney(price)"
  />
</div>
    `,

  "fs-price-range": `
<p v-if="enablePrice" class="flashsearch-price" :data-testid="buildDataTestId('price')">
  <span v-if="priceVaries" class="flashsearch-price--type-regular">
    <span
      class="flashsearch-price-min"
      v-html="fsUtils.formatDisplayMoney(priceMin)"
    />
    <span class="flashsearch-price__split">-</span>
    <span
      class="flashsearch-price-max"
      v-html="fsUtils.formatDisplayMoney(priceMax)"
    />
  </span>
  <span v-else-if="onSale && enableCompareAtPrice">
    <span
      class="flashsearch-price--type-sale"
      v-html="fsUtils.formatDisplayMoney(compareAtPriceMin)"
      :data-testid="buildDataTestId('ca-price')"
    />
    <span
      class="flashsearch-price--type-origin"
      v-html="fsUtils.formatDisplayMoney(priceMin)"
    />
  </span>
  <span
    v-else
    class="flashsearch-price--type-regular"
    v-html="fsUtils.formatDisplayMoney(priceMin)"
  />
</p>
    `,

  "fs-skeleton": `
<a-skeleton active :paragraph="{rows: count, width: width}" :title="false"/>
    `,
};

flashsearch.searchResultsTemplates = {
  "fs-app": `
<fs-config-provider prefixCls="flashsearch">
    <router-view></router-view>
</fs-config-provider>
    `,

  "fs-main": `
<div id="flashsearch-main-container" class="flashsearch-container" :style="srStyles">
  <fs-layout>
    <fs-layout-header>
      <div
        v-if="isCollPage"
        class="flashsearch-collection-header"
        data-testid="sr-collection-header"
      >
        {{collHeader ? collHeader : $t("searchResults.collectionPageHeader.products")}}
      </div>
      <div v-if="isSearchPage" class="flashsearch-search-wrapper">
        <div v-if="isGetProdLoading && enableSearchPageHeader" class="flashsearch-search-wrapper">
          <h1 class="flashsearch-search-result-header">
            <fs-skeleton class="flashsearch-search-result-header__skeleton" />
          </h1>
        </div>
        <h1 v-else-if="enableSearchPageHeader" class="flashsearch-search-result-header" data-testid="sr-search-page-header">
          {{$t("searchResults.searchPageHeader.pageHeader", {count: totalProducts, searchTerm: query})}}
        </h1>
        <fs-input-search
          v-if="enableSearchBox"
          class="flashsearch-search-box"
          :placeholder="$t('searchResults.searchPageHeader.searchBoxPlaceholder')"
          @search="onSearch"
          v-model:value="sbQuery"
          @change="onChangeQuery"
          type="search"
          name="q"
          data-testid="search-box"
          enter-button
        />
        <fs-search-mobile :default-value="sbQuery" />
      </div>
    </fs-layout-header>
    <fs-layout>
      <div
        class="flashsearch-filters-toolbar flashsearch-filters-toolbar--position-top"
      >
        <div class="flashsearch-filters-toolbar__left">
          <fs-filters-icon
            :opened="shouldFilterIconOpened"
            @collapseFilters="collapseFilters"
            @click-mobile-filters="clickMobileFilters"
            :is-loading="isGetProdLoading"
          />
        </div>
        <div class="flashsearch-filters-toolbar__right">
          <fs-total-products
            :total="totalProducts"
            :is-loading="isGetProdLoading"
          />
          <fs-search-results-sort-by :isLoading="isGetProdLoading" />
          <fs-search-results-views
            :view-type="viewType"
            @choose-grid-view="chooseGridView"
            @choose-list-view="chooseListView"
            :is-loading="isGetProdLoading"
          />
        </div>
      </div>
      <div
        class="flashsearch-filters-toolbar flashsearch-filters-toolbar--position-bottom"
      >
        <div class="flashsearch-filters-toolbar__right">
          <fs-total-products
            :search-result="searchResult"
            :is-loading="isGetProdLoading"
            :total="totalProducts"
          />
        </div>
      </div>
      <fs-filters-content
        :search-result="searchResult"
        :collapse-active-key="collapseActiveKey"
        :should-show-mobile-filter="shouldShowMobileFilter"
        @close-mobile-filters="closeMobileFilters"
        @show-results="showResults"
      />
    </fs-layout>
    <fs-layout v-if="isHorizontalLayout">
      <fs-filter-by :is-loading="isGetProdLoading" />
    </fs-layout>
    <fs-layout>
      <fs-layout-sider v-if="isVerticalLeftLayout" :width="270">
        <div
          class="flashsearch-filters__content flashsearch-filters__content--layout-vertical"
        >
          <fs-filter-by
            clear-all-btn-position="label"
            :is-loading="isGetProdLoading"
          />
          <fs-filters
            :filters="searchResult.filters"
            :show-collapse="true"
            :is-loading="isGetProdLoading"
          />
        </div>
      </fs-layout-sider>
      <fs-layout-content>
        <div class="flashsearch-container-inner">
          <div
            v-if="noMatchingFound && isSearchPage"
            class="flashsearch-sr-empty"
            data-testid="sr-empty"
          >
            <p v-if="noMatchingFound && isSearchPage" data-testid="sr-search-empty-page-text">{{$t("searchResults.emptyPage.searchEmptyPageText")}}</p>
            <p v-if="noMatchingFound && isCollPage" data-testid="sr-collections-empty-page-text">{{$t("searchResults.emptyPage.collectionsEmptyPageText")}}</p>
          </div>
        </div>
        <div class="flashsearch-sr-wrapper">
          <fs-search-results-items
            :search-result="searchResult"
            :view-type="viewType"
            :is-loading="isGetProdFetching"
          />
          <fs-custom-pagination
            :total="totalProducts"
            :current-num-of-products="currentNumOfProducts"
            :current="page"
            @change="onChangePage"
            @load-more="onLoadMore"
            :has-next-page="hasNextPage"
            :is-load-more-fetching="isLoadMoreProdFetching"
          />
        </div>
        <fs-quick-view-item
          v-if="shouldShowQuickView"
          :product="currentQvProduct"
          :get-container="() => document.getElementById('flashsearch-main-container')"
        />
      </fs-layout-content>
    </fs-layout>
  </fs-layout>
</div>
    `,

  // Filters
  "fs-filters-content": `
<div
  class="flashsearch-filters__content flashsearch-filters__content--layout-horizontal"
  :class="{'flashsearch-filters__content--visible': collapseActiveKey === '1'}"
>
  <div class="flashsearch-filters__content-inner">
    <fs-collapse :bordered="false" :active-key="collapseActiveKey">
      <fs-collapse-panel
        class="flashsearch-filters__collapse-item"
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
  class="flashsearch-filters__content"
  :class="{'flashsearch-filters__content--visible': collapseActiveKey === '1'}"
>
  <fs-drawer
    class="flashsearch-filters__content-inner--screen-mobile"
    placement="left"
    :closable="true"
    @close="closeMobileFilters"
    :visible="shouldShowMobileFilter"
  >
    <template #title>
      <span class="flashsearch-filters-title-wrapper">
        <span class="flashsearch-filters-title">{{$t("searchResults.filter.filtersTitle")}}</span>
        <fs-button-clear-all type="text" />
      </span>
    </template>
    <fs-filters :filters="searchResult.filters" :isMobile="true" />
    <div class="flashsearch-filters__footer">
      <fs-button
        class="flashsearch-filters__show-results"
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

  "fs-filter-by": `
<div v-if="isLoading" class="flashsearch-filter-by" :style="{'margin-left': 0}">
  <div class="flashsearch-filter-by__top">
    <div class="flashsearch-filter-by__label">
      <fs-skeleton class="flashsearch-filter-by__label__skeleton" />
    </div>
  </div>
  <div class="flashsearch-filter-by__bottom">
    <fs-skeleton class="flashsearch-filter-by__bottom__skeleton" :count="2" />
  </div>
</div>
<div
  v-else-if="shouldShowFilterBy"
  class="flashsearch-filter-by"
  v-bind="$attrs"
>
  <div v-if="shouldShowTopContent" class="flashsearch-filter-by__top">
    <div class="flashsearch-filter-by__label">Filtered by</div>
    <fs-button-clear-all
      v-if="clearAllBtnPosition === 'label' && shouldShowClearAllBtn"
    />
  </div>
  <div class="flashsearch-filter-by__bottom">
    <fs-filter-by-option
      v-for="({value, filterLabel, handleCloseFunc}, index) in collectionOptions"
      :key="index"
      :label="shouldShowOptionLabel ? filterLabel + ':' : ''"
      :value="value"
      @close="handleCloseFunc"
      :closable="optionClosable"
      :testId="optionTestId"
    />
    <fs-filter-by-option
      v-for="(option, index) in options"
      :key="index"
      :label="shouldShowOptionLabel ? option.filterLabel + ':' : ''"
      :value="transformDisplayOption(option)"
      @close="removeOption(option)"
      :closable="optionClosable"
      :testId="optionTestId"
    />
    <fs-button-clear-all
      v-if="clearAllBtnPosition === 'inline' && shouldShowClearAllBtn && (collectionOptions.length + options.length > 1)"
    />
  </div>
</div>
    `,

  "fs-filter-by-each-filter": `
<fs-filter-by
  class="flashsearch-filter-by--each-filter"
  :filter="filter"
  :should-show-top-content="false"
  :should-show-clear-all-btn="false"
  :option-closable="false"
  :should-show-option-label="false"
  :visible="visible"
  option-test-id="filter-by-option-each-filter"
/>
    `,

  "fs-filter-by-option": `
<div class="flashsearch-filter-by__option" :data-testid="testId">
  <fs-tag :closable="closable" @close="close">
    <span v-if="!!label" class="flashsearch-filter-by__option-label"
      >{{label}}</span
    >
    {{value}}
  </fs-tag>
</div>
    `,

  "fs-filters": `
<template v-if="isLoading">
  <div
    class="flashsearch-filter"
    v-for="index in [...Array(3).keys()]"
    :key="index"
  >
    <div class="flashsearch-filter__top">
      <h5 class="flashsearch-filter__title" data-testid="filter-title">
        <fs-skeleton class="flashsearch-filter__title__skeleton" />
      </h5>
    </div>
    <fs-skeleton class="flashsearch-filter__skeleton" :count="4" />
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
        class="flashsearch-filter__collapse-arrow"
        :rotate="isActive ? 270 : 90"
      />
    </template>
    <template v-for="(filter, index) in filters" :key="'' + index">
      <fs-collapse-panel
        v-show="!isFilterEmpty(filter)"
        class="flashsearch-filter"
      >
        <template #header>
          <div class="flashsearch-filter__top">
            <h5 class="flashsearch-filter__title" data-testid="filter-title">
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
            <fs-button-clear
              v-else-if="shouldShowClearBtn(filter)"
              @clear="clearFilter(filter)"
            />
          </div>
        </template>
        <fs-filter :filter="filter" :isMobile="isMobile" />
        <fs-button-clear
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
      class="flashsearch-filter"
      data-testid="filter"
    >
      <div class="flashsearch-filter__top">
        <h5 class="flashsearch-filter__title" data-testid="filter-title">
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
        <fs-button-clear
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
  class="flashsearch-filter__content--list flashsearch-filter__content--single-list flashsearch-filter__content--collections"
  :class="{'flashsearch-filter--screen-mobile': isMobile}"
>
  <div class="flashsearch-filter__content">
    <fs-input
      v-if="shouldShowSearchBox"
      class="flashsearch-filter__searchbox"
      @change="onSearch"
      placeholder="Search options"
      :value="query"
      data-testid="filter-searchbox"
    />
    <div
      class="flashsearch-filter__content-inner"
      :class="{'flashsearch-filter__content-inner--scrollable': shouldUseScrollbar}"
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
            <span
              class="flashsearch-option flashsearch-option--single-list"
              :class="{'flashsearch-option--selected': isSelectedItem(item)}"
              @click.prevent="onClickItem(item)"
              data-testid="option"
              role="checkbox"
              :aria-checked="isSelectedItem(item) ? 'true' : 'false'"
            >
              <span class="flashsearch-option__value" data-testid="option-value"
                >{{item.label}}</span
              >
              <fs-filter-option-amount :count="item.count"/>
            </span>
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
        <a
          v-for="(item, index) in getFilterValues(query, {viewMoreLimit: 5})"
          :key="index"
          class="flashsearch-option flashsearch-option--single-list"
          :class="{'flashsearch-option--selected': isSelectedItem(item)}"
          @click.prevent="onClickItem(item)"
          data-testid="option"
          role="checkbox"
          :aria-checked="isSelectedItem(item) ? 'true' : 'false'"
        >
          <span class="flashsearch-option__value" data-testid="option-value">
            {{item.label}}
          </span>
          <fs-filter-option-amount :count="item.count"/>
        </a>
      </template>
    </div>
    <fs-button-view-more
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
        <span
          class="flashsearch-option flashsearch-option--single-list"
          :class="{'flashsearch-option--selected': isSelectedItem(item)}"
          @click.prevent="onClickItem(item)"
          data-testid="sub-option"
          role="checkbox"
          :aria-checked="isSelectedItem(item) ? 'true' : 'false'"
        >
          <span
            class="flashsearch-option__value"
            :data-testid="buildTestId(index)"
            >{{item.name}}</span
          >
        </span>
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
  <a
    v-else
    class="flashsearch-option flashsearch-option--single-list"
    :class="{'flashsearch-option--selected': isSelectedItem(item)}"
    @click.prevent="onClickItem(item)"
    data-testid="sub-option"
    role="checkbox"
    :aria-checked="isSelectedItem(item) ? 'true' : 'false'"
  >
    <span class="flashsearch-option__value" :data-testid="buildTestId(index)"
      >{{item.name}}</span
    >
  </a>
</template>
    `,

  "fs-filter-list": `
<div
  class="flashsearch-filter__content flashsearch-filter__content--list"
  :class="{'flashsearch-filter__content--multiple-list': filter.multipleSelection}"
>
  <fs-input
    v-if="shouldShowSearchBox"
    class="flashsearch-filter__searchbox"
    @change="onSearch"
    placeholder="Search options"
    :value="query"
    data-testid="filter-searchbox"
  />
  <div
    class="flashsearch-filter__content-inner"
    :class="{'flashsearch-filter__content-inner--scrollable': shouldUseScrollbar}"
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
          <span
            class="flashsearch-option flashsearch-option--multiple-list"
            role="checkbox"
            :aria-checked="isSelectedOptions(value)"
            data-testid="option"
          >
            <span class="flashsearch-option__value" data-testid="option-value">
              {{label}}
            </span>
            <fs-filter-option-amount :count="count"/>
          </span>
        </fs-checkbox>
      </fs-col>
    </fs-row>
    <template v-else>
      <a
        v-for="({label, value, count}, index) in getFilterValues(query, {viewMoreLimit: 5})"
        :key="index"
        class="flashsearch-option flashsearch-option--single-list"
        :class="{'flashsearch-option--selected': isSelectedOptions(value)}"
        @click.prevent="selectOption(value)"
        data-testid="option"
        role="checkbox"
        :aria-checked="isSelectedOptions(value) ? 'true' : 'false'"
      >
        <span class="flashsearch-option__value" data-testid="option-value"
          >{{label}}</span
        >
        <fs-filter-option-amount :count="count"/>
      </a>
    </template>
  </div>
  <fs-button-view-more
    v-if="shouldUseViewMore && getFilterValues(query).length > 5"
    :on-view-more-status="onViewMoreStatus"
    @view-more="viewMore"
  />
</div>
    `,

  "fs-filter-box": `
<div class="flashsearch-filter__content">
  <fs-input
    v-if="shouldShowSearchBox"
    class="flashsearch-filter__searchbox"
    @change="onSearch"
    placeholder="Search options"
    :value="query"
    data-testid="filter-searchbox"
  />
  <div
    class="flashsearch-filter__content-inner flashsearch-filter__content-inner--box"
    :class="{'flashsearch-filter__content-inner--scrollable': shouldUseScrollbar}"
    data-testid="filter-content"
  >
    <fs-filter-box-option
      v-for="({label, count, value}, index) in getFilterValues(query, {viewMoreLimit: 4})"
      :key="index"
      :label="label"
      :count="count"
      :is-selected="filter.multipleSelection ? isSelectedOptions(value) : isSelectedOption(value)"
      @select-option="filter.multipleSelection ? selectOptions(value) : selectOption(value)"
    />
  </div>
  <fs-button-view-more
    v-if="shouldUseViewMore && getFilterValues(query).length > 4"
    :on-view-more-status="onViewMoreStatus"
    @view-more="viewMore"
  />
</div>
    `,

  "fs-filter-box-option": `
<fs-tooltip
  :title="label + ' ' + '(' + count + ')'"
  :mouse-leave-delay="0"
  :mouse-enter-delay="1"
  overlay-class-name="flashsearch-option__tooltip"
>
  <fs-button
    class="flashsearch-option flashsearch-option--box"
    :class="{'flashsearch-option--box-selected': isSelected}"
    @click.prevent="selectOption"
    role="checkbox"
    :aria-checked="isSelected ? 'true' : 'false'"
    data-testid="option"
  >
    <span
      class="flashsearch-option__value flashsearch-option__value--box"
      data-testid="option-value"
      >{{label}}</span
    >
    <span
      class="flashsearch-option__amount flashsearch-option__amount--box"
      data-testid="option-amount"
      >({{count}})</span
    >
  </fs-button>
</fs-tooltip>
    `,

  "fs-filter-range": `
<div class="flashsearch-filter__content flashsearch-filter__content--range">
  <div class="flashsearch-option-range__amount">
    <span class="flashsearch-option-range__min">
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
      class="flashsearch-option-range__split"
      data-testid="filter-range-split"
    >
      {{filter.range.rangeFormat.replace("{0}", "").replace("{1}", "")}}
    </span>
    <span class="flashsearch-option-range__max">
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
  <div class="flashsearch-option-range__slider" data-testid="filter-range">
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
  class="flashsearch-filter__content flashsearch-filter__content--list"
  :class="{'flashsearch-filter__content--multiple-list': shouldDisplaySelectedRatingOnly && filter.multipleSelection}"
>
  <a
    v-for="(value, index) in ['5', '4', '3', '2', '1']"
    :key="index"
    class="flashsearch-option flashsearch-option--single-list flashsearch-option__review-rating"
    :class="{'flashsearch-option--selected': isSelectedOption(value), 'flashsearch-option__review-rating--disabled': getCount(value) <= 0}"
    @click.prevent="selectOption(value)"
    role="checkbox"
    :aria-checked="isSelectedOption(value) ? 'true' : 'false'"
    data-testid="option"
  >
    <span class="flashsearch-option__value">
      <span :style="{display: 'none'}" data-testid="option-value"
        >{{value}}</span
      >
      <fs-rate
        disabled
        :value="parseInt(value)"
        class="flashsearch-rate-star--filter"
        :style="{color: filter.rating.hex}"
      />
      <span
        v-if="shouldDisplaySelectedRatingAndAbove"
        class="flashsearch-rate-up"
        data-testid="option-rating-up"
        >& Up</span
      >
    </span>
    <fs-filter-option-amount :count="getCount(value)"/>
  </a>
</div>
    `,

  "fs-filter-stock-status": `
<div
  class="flashsearch-filter__content flashsearch-filter__content--list flashsearch-filter__content--multiple-list"
>
  <div class="flashsearch-filter__content-inner" data-testid="filter-content">
    <fs-row data-testid="option-groups">
      <fs-col
        v-for="({label, value, count}, index) in filterValues"
        :key="index"
        :span="24"
        @click.prevent="selectOptions(value)"
      >
        <fs-checkbox :value="value" :checked="isSelectedOptions(value)">
          <span
            class="flashsearch-option flashsearch-option--multiple-list"
            role="checkbox"
            :aria-checked="isSelectedOptions(value) ? 'true' : 'false'"
            data-testid="option"
          >
            <span class="flashsearch-option__value" data-testid="option-value">
              {{label}}
            </span>
            <fs-filter-option-amount :count="count"/>
          </span>
        </fs-checkbox>
      </fs-col>
    </fs-row>
  </div>
</div>
    `,

  "fs-filter-swatch": `
<div class="flashsearch-filter__content">
  <fs-input
    v-if="shouldShowSearchBox"
    class="flashsearch-filter__searchbox"
    @change="onSearch"
    placeholder="Search options"
    :value="query"
    data-testid="filter-searchbox"
  />
  <div
    class="flashsearch-filter__content-inner flashsearch-filter__content-inner--type-swatch"
    :class="{'flashsearch-filter__content-inner--scrollable': shouldUseScrollbar}"
    data-testid="filter-content"
  >
    <fs-filter-swatch-option
      v-for="({label, count, value, hex, imageUrl}, index) in getFilterValues(query, {viewMoreLimit: isMobile ? 5 : 20})"
      :key="index"
      :label="label"
      :count="count"
      :imageUrl="imageUrl"
      :hex="hex"
      :is-selected="filter.multipleSelection ? isSelectedOptions(value) : isSelectedOption(value)"
      @select-option="filter.multipleSelection ? selectOptions(value) : selectOption(value)"
    />
    <fs-button-view-more
      v-if="shouldUseViewMore && getFilterValues(query).length > (isMobile ? 5 : 20)"
      :on-view-more-status="onViewMoreStatus"
      @view-more="viewMore"
    />
  </div>
</div>
    `,

  "fs-filter-swatch-option": `
<fs-tooltip
  :title="label + ' ' + '(' + count + ')'"
  :mouse-leave-delay="0"
  :mouse-enter-delay="1"
  overlay-class-name="flashsearch-option__tooltip"
>
  <a
    @click.prevent="selectOption"
    class="flashsearch-option flashsearch-option--type-swatch"
    :class="{'flashsearch-option--selected': isSelected}"
    role="checkbox"
    :aria-checked="isSelected ? 'true' : 'false'"
    data-testid="option"
  >
    <span class="flashsearch-option--left">
      <span
        class="flashsearch-option__image--type-swatch"
        :class="{'flashsearch-option__image--type-swatch--selected': isSelected}"
        :style="imageUrl ? {'background-image': 'url(' + imageUrl + ')'} : {'background-color': hex}"
      />
      <span
        class="flashsearch-option__value flashsearch-option__value--type-swatch"
        data-testid="option-value"
        >{{label}}</span
      >
    </span>
    <span class="flashsearch-option--right">
      <fs-filter-option-amount :count="count"/>
    </span>
  </a>
</fs-tooltip>
    `,

  "fs-filter-option-amount": `
<span
  v-if="enable"
  class="flashsearch-option__amount"
  data-testid="option-amount"
>
  ({{count}})
</span>
  `,
  // End filter types

  "fs-filters-icon": `
<div v-if="enable && isLoading" class="flashsearch-filters-icon-wrapper">
  <div v-if="isHorizontalLayout" class="flashsearch-filters-icon">
    <fs-skeleton class="flashsearch-filters-icon__skeleton" />
  </div>
  <div class="flashsearch-filters-icon flashsearch-filters-icon--mobile">
    <fs-skeleton class="flashsearch-filters-icon--mobile__skeleton" />
  </div>
</div>
<div v-else-if="enable" class="flashsearch-filters-icon-wrapper">
  <div
    v-if="isHorizontalLayout"
    class="flashsearch-filters-icon"
    :class="{'flashsearch-filters-icon--opened': opened}"
    data-testid="sr-filter-icon"
    @click="collapseFilters"
  >
    <div class="flashsearch-filters-icon__inner" :class="{'opened': opened}">
      <span class="flashsearch-icon-wrapper flashsearch-icon-slider">
        <fs-sliders-outlined />
      </span>
      <span class="flashsearch-icon-wrapper flashsearch-icon-close">
        <fs-close-outlined />
      </span>
    </div>
    <span class="flashsearch-filters-icon__label" data-testid="sr-filter-label">{{$t("searchResults.toolbars.filters")}}</span>
  </div>
  <div
    class="flashsearch-filters-icon flashsearch-filters-icon--mobile"
    data-testid="sr-filter-icon-mobile"
    @click="clickMobileFilters"
  >
    <div class="flashsearch-filters-icon__inner">
      <span class="flashsearch-icon-wrapper flashsearch-icon-slider">
        <fs-sliders-outlined />
      </span>
    </div>
    <span class="flashsearch-filters-icon__label" data-testid="sr-filter-label-mobile">{{$t("searchResults.toolbars.filters")}}</span>
  </div>
</div>
    `,

  "fs-button-clear": `
<fs-button
  type="link"
  class="flashsearch-filter__clear"
  @click.stop.prevent="clear"
  data-testid="filter-clear"
>
  {{$t("searchResults.filter.clear")}}
</fs-button>
    `,

  "fs-button-clear-all": `
<fs-button
  v-show="shouldShowButton"
  @click="clearAll"
  type="link"
  data-testid="filter-by-clear-all"
  class="flashsearch-filter-by__clear-all"
  :class="{'flashsearch-filter-by__clear-all--text': type === 'text'}"
>
  {{$t("searchResults.filter.clearAll")}}
</fs-button>
    `,

  "fs-button-view-more": `
<fs-button
  type="link"
  class="flashsearch-filter__view-more"
  @click.prevent="viewMore"
  data-testid="filter-view-more"
>
  {{onViewMoreStatus ? $t("searchResults.filter.viewLess") : $t("searchResults.filter.viewMore")}}
</fs-button>
    `,
  // End filters

  "fs-search-mobile": `
<span
  class="flashsearch-input-search flashsearch-search-box flashsearch-search-box--mobile flashsearch-input-search-enter-button flashsearch-input-group-wrapper"
>
  <span class="flashsearch-input-wrapper flashsearch-input-group">
    <input
      id="flashsearch-searchbox-on-search-page"
      placeholder="Search"
      data-testid="search-box-mobile"
      type="search"
      name="q"
      class="flashsearch-input"
      :value="defaultValue"
      :ref="el => inputRef = el"
    />
    <span class="flashsearch-input-group-addon">
      <fs-button
        class="flashsearch-input-search-button"
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
<div v-if="enable">
  <div v-if="isLoading" class="flashsearch-filters-total-products">
    <fs-skeleton class="flashsearch-filters-total-products__skeleton" />
  </div>
  <div v-else class="flashsearch-filters-total-products">
    <i18n-t
      keypath="searchResults.toolbars.totalProducts"
      tag="span"
      data-testid="sr-total-products-wrapper"
    >
      <template #count>
        <span
          class="flashsearch-filters-total-products__total"
          data-testid="sr-total-products"
        >
          {{total}}
        </span>
      </template>
    </i18n-t>
  </div>
</div>
    `,

  "fs-search-results-sort-by": `
<div v-if="enable">
  <div v-if="isLoading" class="flashsearch-sort-by">
    <div class="flashsearch-sort-by__content">
      <fs-skeleton class="flashsearch-sort-by__content__skeleton" />
    </div>
    <div class="flashsearch-sort-by__mobile-content">
      <fs-skeleton class="flashsearch-sort-by__mobile-content__skeleton" />
    </div>
  </div>
  <div v-else id="flashsearch-sr-toolbars-sort-by" class="flashsearch-sort-by" data-testid="sr-sort-by">
    <div class="flashsearch-sort-by__content" data-testid="sr-sort-by-select">
      <fs-select
        size="large"
        v-model:value="sortBy"
        @change="changeSortByDesktop"
        :get-popup-container="() => document.getElementById('flashsearch-sr-toolbars-sort-by')"
      >
        <fs-select-option
          v-for="({value, label}, index) in sortByList"
          :key="index"
          :value="value"
          data-testid="sr-sort-by-option"
          class="flashsearch-sort-by__option"
        >
          {{label}}
        </fs-select-option>
      </fs-select>
    </div>
    <div class="flashsearch-sort-by__mobile-content">
      <fs-button
        type="link"
        class="flashsearch-sort-by__button"
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
        :get-container="() => document.getElementById('flashsearch-sr-toolbars-sort-by')"
      >
        <template v-slot:title>
          <span class="flashsearch-sort-by__title" data-testid="sr-sort-by-title">Sort by</span>
        </template>
        <div class="flashsearch-sort-by__mobile-content-inner">
          <span
            v-for="({value, label}, index) in sortByList"
            :key="index"
            class="flashsearch-sort-by__item"
            :class="{'flashsearch-sort-by__item--selected': sortBy === value}"
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
</div>
    `,

  "fs-product-buttons": `
<div class="flashsearch-product__button-wrapper">
  <a
    v-if="enableQuickView"
    class="flashsearch-product__button flashsearch-product__button--type-quick-view"
    rel="nofollow"
    @click="showQuickView"
    data-testid="sr-quick-view-btn"
  >
    <fs-eye-outlined class="flashsearch-product__button__icon" />
    <span class="flashsearch-product__button__text" data-testid="sr-quick-view-text">{{$t("searchResults.productItem.quickView")}}</span>
  </a>
  <span v-if="product.availableForSale && enableAddToCart">
    <a
      v-if="product.variants.length > 1"
      class="flashsearch-product__button flashsearch-product__button--type-atc"
      :href="product.url"
      rel="nofollow"
      data-testid="sr-atc-btn"
      @click="onSelectOptions"
    >
      <fs-shopping-cart-outlined class="flashsearch-product__button__icon" />
      <span class="flashsearch-product__button__text" data-testid="sr-atc-text">{{$t("searchResults.productItem.selectOptions")}}</span>
    </a>
    <form
      v-else
      method="post"
      action="/cart/add"
      acceptCharset="UTF-8"
      enctype="multipart/form-data"
      class="flashsearch-product__button flashsearch-product__button--type-atc"
      :id="'flashsearch-product-form-' + currentVariant.id"
      @click="onSubmit"
      data-testid="sr-atc-btn"
    >
      <fs-shopping-cart-outlined class="flashsearch-product__button__icon" />
      <input type="hidden" name="form_type" value="product" />
      <input type="hidden" name="quantity" value="1" min="1" />
      <input type="hidden" name="id" :value="currentVariant.id" />
      <span class="flashsearch-product__button__text" data-testid="sr-atc-text">{{$t("searchResults.productItem.addToCart")}}</span>
    </form>
  </span>
  <a
    v-else-if="enableAddToCart"
    class="flashsearch-product__button flashsearch-product__button--type-atc"
    :href="product.url"
    rel="nofollow"
    data-testid="sr-atc-btn"
    @click="onReadMore"
  >
    <fs-info-circle-outlined class="flashsearch-product__button__icon" />
    <span class="flashsearch-product__button__text" data-testid="sr-atc-text">{{$t("searchResults.productItem.readMore")}}</span>
  </a>
</div>
    `,

  "fs-product-image": `
<a class="flashsearch-product-image--type-main-wrapper" :href="productUrl">
  <div
    class="flashsearch-product-image--type-main"
    :style="{'padding-top': '127.586%', 'background-image': 'url(' + mainProductImage + ')'}"
  />
</a>
<div
  v-if="secondProductImage"
  class="flashsearch-product-image--type-hover-wrapper"
>
  <div
    class="flashsearch-product-image--type-hover"
    :style="{'padding-top': '127.586%', 'background-image': 'url(' + secondProductImage + ')'}"
  />
</div>
    `,

  "fs-product-label": `
<span class="flashsearch-label-wrapper">
  <span
    v-if="!availableForSale && enableSoldOutLabel"
    class="flashsearch-label flashsearch-label--type-soldout"
    :data-testid="soldOutDataTestid"
  >
    {{$t("searchResults.productItem.soldOut")}}
  </span>
  <span
    v-else-if="onSale && enableSaleLabel"
    class="flashsearch-label flashsearch-label--type-onsale"
    :data-testid="saleDataTestid"
  >
    {{$t("searchResults.productItem.sale")}}
  </span>
</span>
    `,

  "fs-product-title": `
<h3 class="flashsearch-product-title">
  <a :href="url" v-html="title" data-testid="sr-product-title" />
</h3>
  `,

  "fs-product-vendor": `
<div v-if="enable" class="flashsearch-product-vendor">
  <a
    v-html="vendor"
    data-testid="sr-product-vendor"
    @click="onClickVendor"
  />
</div>
  `,

  "fs-quick-view-item": `
<fs-modal
  class="flashsearch-quickview-wrapper"
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
      class="flashsearch-quickview-thumbs"
    >
      <fs-product-label
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
        sold-out-data-testid="sr-qv-product-label-sold-out"
        sale-data-testid="sr-qv-product-label-sale"
      />
      <fs-carousel arrows dot-position="top" :ref="el => caroRef = el">
        <template #prevArrow>
          <div
            class="flashsearch-quickview__slick-arrow"
            :style="{left: '10px', 'z-index': 2}"
          >
            <fs-left-circle-outlined />
          </div>
        </template>
        <template #nextArrow>
          <div class="flashsearch-quickview__slick-arrow" style="right: 10px">
            <fs-right-circle-outlined />
          </div>
        </template>
        <div v-for="(image, index) in product.images" :key="index">
          <div class="flashsearch-quickview-thumbs-item-wrapper">
            <span
              class="flashsearch-quickview-thumbs-item"
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
      class="flashsearch-quickview-product-details-wrapper"
    >
      <div
        class="flashsearch-quickview-product-details flashsearch-scroll-content"
      >
        <h1 data-testid="sr-qv-product-title" class="flashsearch-quickview__title">
          <a :href="product.url">{{product.title}}</a>
        </h1>
        <fs-price
          class="flashsearch-quickview__price"
          :on-sale="onSale"
          :price="currentVariant.price"
          :compare-at-price="currentVariant.compareAtPrice"
          :enable-price="enablePrice"
          :enable-compare-at-price="enableCompareAtPrice"
          data-testid-prefix="sr-qv"
        />
        <p v-if="enableVendor" class="flashsearch-quickview__vendor" data-testid="sr-qv-product-vendor">{{product.vendor}}</p>
        <p v-if="enableDescription" class="flashsearch-quickview__description flashsearch-ellipsis-text" data-testid="sr-qv-product-description">
          {{product.description}}
        </p>
        <fs-form
          v-if="product.availableForSale"
          class="flashsearch-quickview__form"
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
            <fs-select size="large" v-model:value="formState[option.name]" :get-popup-container="() => document.getElementById('flashsearch-main-container')" data-testid="sr-qv-options-select">
              <fs-select-option
                v-for="(value, index) in option.values"
                :key="index"
                :value="value"
                class="flashsearch-quickview__option"
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
                  class="flashsearch-quickview__quantity"
                />
              </fs-form-item>
            </fs-col>
            <fs-col :xl="16" :lg="16" :md="16" :sm="16" :xs="16">
              <fs-form-item>
                <fs-button
                  v-if="isCurrentVariantAvailable"
                  class="flashsearch-quickview__add-to-cart-btn"
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
                  class="flashsearch-quickview__add-to-cart-btn"
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
          class="flashsearch-quickview__add-to-cart-btn"
          :disabled="true"
          data-testid="sr-qv-disabled-btn"
        >
          {{$t("searchResults.quickView.soldOut")}}
        </fs-button>
      </div>
    </fs-col>
  </fs-row>
</fs-modal>
    `,

  "fs-search-results-grid-view-item": `
<fs-col
  class="flashsearch-product-wrapper"
  :xl="isHorizontalLayout ? 6 : 8"
  :lg="isHorizontalLayout ? 6 : 8"
  :md="isHorizontalLayout ? 6 : 8"
  :sm="12"
  :xs="12"
  data-testid="grid-view-item"
  @click="onClickItem"
>
  <div class="flashsearch-product">
    <div class="flashsearch-product-image-container">
      <fs-product-label
        :available-for-sale="product.availableForSale"
        :on-sale="onSale"
        :enable-sold-out-label="enableSoldOutLabel"
        :enable-sale-label="enableSaleLabel"
      />
      <fs-product-image
        :product-url="product.url"
        :main-product-image="mainProductImage"
        :second-product-image="secondProductImage"
      />
      <fs-product-buttons
        :product="product"
        :current-variant="currentVariant"
      />
    </div>
    <div class="flashsearch-product__info">
      <fs-product-title :url="product.url" :title="product.title" class="flashsearch-product__info__title"/>
      <fs-product-vendor :vendor="product.vendor" class="flashsearch-product__info__vendor"/>
      <fs-price-range
        class="flashsearch-product__price"
        :price-varies="priceVaries"
        :on-sale="onSale"
        :price-min="product.priceMin"
        :price-max="product.priceMax"
        :compare-at-price-min="product.compareAtPriceMin"
        :enable-price="enablePrice"
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
  class="flashsearch-product-wrapper"
  data-testid="list-view-item"
  @click="onClickItem"
>
  <fs-row class="flashsearch-product flashsearch-product-list">
    <fs-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
      <div class="flashsearch-product-image-container">
        <fs-product-label
          :available-for-sale="product.availableForSale"
          :on-sale="onSale"
          :enable-sold-out-label="enableSoldOutLabel"
          :enable-sale-label="enableSaleLabel"
        />
        <fs-product-image
          :product-url="product.url"
          :main-product-image="mainProductImage"
          :second-product-image="secondProductImage"
        />
        <fs-product-buttons
          :product="product"
          :current-variant="currentVariant"
        />
      </div>
    </fs-col>
    <fs-col
      :xl="12"
      :lg="12"
      :md="12"
      :sm="24"
      :xs="24"
      class="flashsearch-product-list__info-left"
    >
      <fs-product-title :url="product.url" :title="product.title" class="flashsearch-product-list__info__title"/>
      <fs-product-vendor :vendor="product.vendor" class="flashsearch-product-list__vendor"/>
      <div
        class="flashsearch-product-list__info__description flashsearch-ellipsis-text"
        v-html="product.description"
      />
    </fs-col>
    <fs-col
      :xl="6"
      :lg="6"
      :md="6"
      :sm="24"
      :xs="24"
      class="flashsearch-product-list__info-right"
    >
      <fs-price-range
        class="flashsearch-product__price"
        :price-varies="priceVaries"
        :on-sale="onSale"
        :price-min="product.priceMin"
        :price-max="product.priceMax"
        :compare-at-price-min="product.compareAtPriceMin"
      />
    </fs-col>
  </fs-row>
</fs-col>
    `,

  "fs-search-results-items": `
<fs-row class="flashsearch-products">
  <template v-if="isLoading && viewType === 'grid'">
    <fs-col
      class="flashsearch-product-wrapper"
      :xl="isHorizontalLayout ? 6 : 8"
      :lg="isHorizontalLayout ? 6 : 8"
      :md="isHorizontalLayout ? 6 : 8"
      :sm="12"
      :xs="12"
      v-for="index in [...Array(isHorizontalLayout ? 4 : 3).keys()]"
      :key="index"
    >
      <fs-skeleton class="flashsearch-skeleton-product-image" />
      <fs-skeleton class="flashsearch-skeleton-product__title" />
      <fs-skeleton class="flashsearch-skeleton-product__text" />
    </fs-col>
  </template>
  <template v-else-if="isLoading && viewType === 'list'">
    <fs-col
      class="flashsearch-product-wrapper"
      :xl="24"
      :lg="24"
      :md="24"
      :sm="24"
      :xs="24"
      v-for="index in [...Array(4).keys()]"
      :key="index"
    >
      <fs-row class="flashsearch-product flashsearch-product-list">
        <fs-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
          <fs-skeleton class="flashsearch-skeleton-product-image" />
        </fs-col>
        <fs-col
          :xl="12"
          :lg="12"
          :md="12"
          :sm="24"
          :xs="24"
          class="flashsearch-product-list__info-left"
        >
          <h3 class="flashsearch-product-list__info__title">
            <fs-skeleton class="flashsearch-skeleton-product__title" />
          </h3>
          <div class="flashsearch-product-list__info__vendor">
            <fs-skeleton class="flashsearch-skeleton-product__text" />
          </div>
          <div class="flashsearch-product-list__info__description">
            <div>
              <fs-skeleton class="flashsearch-skeleton-product__text" />
            </div>
            <div>
              <fs-skeleton class="flashsearch-skeleton-product__text" />
            </div>
          </div>
        </fs-col>
        <fs-col
          :xl="6"
          :lg="6"
          :md="6"
          :sm="24"
          :xs="24"
          class="flashsearch-product-list__info-right"
        >
          <fs-skeleton class="flashsearch-skeleton-product__text" />
        </fs-col>
      </fs-row>
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
  <div v-if="isLoading" class="flashsearch-filters-toolbar__views">
    <fs-skeleton class="flashsearch-filters-toolbar__view__skeleton" />
  </div>
  <div v-else class="flashsearch-filters-toolbar__views">
    <a
      v-if="enableGridView"
      :href="null"
      @click="chooseGridView"
      class="flashsearch-filters-toolbar__view flashsearch-filters-toolbar__view--type-grid"
      :class="{'flashsearch-filters-toolbar__view--status-active': viewType === 'grid'}"
      data-testid="sr-grid-view-icon"
    >
      <fs-app-store-outlined />
    </a>
    <a
      v-if="enableListView"
      @click="chooseListView"
      class="flashsearch-filters-toolbar__view flashsearch-filters-toolbar__view--type-list"
      :class="{'flashsearch-filters-toolbar__view--status-active': viewType === 'list'}"
      data-testid="sr-list-view-icon"
    >
      <fs-bars-outlined />
    </a>
  </div>
</div>
    `,

  "fs-custom-pagination": `
<div class="flashsearch-sr-paging">
  <fs-pagination
    v-if="isPagination"
    :default-current="1"
    :default-page-size="productsPerPage"
    :total="total"
    :current="current"
    @change="change"
    data-testid="sr-pa-pagination"
  />
  <div v-else-if="isLoadMore && hasNextPage" class="flashsearch-load-more-paging" data-testid="sr-pa-load-more">
    <fs-spin
      v-if="isLoadMoreFetching"
      size="large"
      :indicator="indicator"
      data-testid="sr-pa-load-more-loading-icon"
    />
    <div v-else>
      <div
        class="flashsearch-load-more-paging__title"
        data-testid="sr-pa-load-more-title"
      >
        {{$t("searchResults.pagination.loadMoreTotal", {current: currentNumOfProducts, total: total})}}
      </div>
      <fs-button
        class="flashsearch-load-more-paging__button"
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
    class="flashsearch-load-more-paging"
    data-testid="sr-pa-infinite-loading"
  >
    <fs-spin v-if="isLoadMoreFetching" size="large" :indicator="indicator" />
  </div>
  </div>
  `,
};

flashsearch.instantSearchTemplates = {
  "fs-app": `
<fs-config-provider prefixCls="flashsearch">
  <div id="flashsearch-instant-search">
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
  class="flashsearch-is-wrapper"
  :class="{'flashsearch-is--layout-vertical': isVerticalLayout}"
  :style="isStyles"
  @touchmove="() => document.activeElement.blur()"
  data-testid="is-wrapper"
>
  <div class="flashsearch-is__content-wrapper">
    <div class="flashsearch-is-cols">
      <div class="flashsearch-is-col">
        <template v-for="(part, index) in partsOfResults">
          <fs-suggestions
            :key="index"
            v-if="shouldShowSuggestionsPart(part)"
            :isNotEmpty="isSuggestionsNotEmpty"
            :suggestResults="suggestResults"
          />
          <fs-collections
            :key="index"
            v-if="shouldShowCollectionsPart(part)"
            :isNotEmpty="isCollectionsNotEmpty"
            :suggestResults="suggestResults"
          />
          <fs-pages
            :key="index"
            v-if="shouldShowPagesPart(part)"
            :isNotEmpty="isPagesNotEmpty"
            :suggestResults="suggestResults"
          />
          <fs-products
            :key="index"
            v-if="shouldShowProductsPart(part)"
            :isNotEmpty="isProductsNotEmpty"
            :suggestResults="suggestResults"
          />
        </template>
      </div>
      <div class="flashsearch-is-col">
        <fs-products
          v-if="shouldShowProductsPartForVerticalLayout"
          :isNotEmpty="isProductsNotEmpty"
          :suggestResults="suggestResults"
        />
        <div
          class="flashsearch-is__view-all-results-wrapper"
          v-if="showViewAllResults"
          data-testid="is-view-all"
        >
          <fs-instant-search-item :url="'/search?q=' + suggestResults.query">
            <div class="flashsearch-is__view-all-results__text-wrapper">
            <i18n-t
              keypath="instantSearch.messages.viewAllResults"
              tag="span"
              class="flashsearch-is__view-all-results__text"
              data-testid="is-view-all-text"
            >
              <template #searchTerm>
                <span
                  class="flashsearch-is__view-all-results__query"
                  data-testid="is-view-all-st"
                >
                  {{suggestResults.query}}
                </span>
              </template>
            </i18n-t>
            </div>
          </fs-instant-search-item>
        </div>
      </div>
    </div>
    <fs-did-you-mean
      v-if="!isProductsNotEmpty"
      :suggest-results="suggestResults"
    />
    <div
      v-show="showEmptyPage"
      class="flashsearch-is__empty-page-wrapper"
      data-testid="is-not-found"
    >
      <i18n-t keypath="instantSearch.messages.nothingFound" tag="span">
        <template #searchTerm>
          <span
            class="flashsearch-is__empty-page__query"
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

  "fs-suggestions": `
<div
  v-if="isNotEmpty"
  class="flashsearch-is__suggestions-wrapper"
>
  <div class="flashsearch-is__label" data-testid="is-label">{{$t("instantSearch.labels.popularSuggestions")}}</div>
  <fs-instant-search-item
    class="flashsearch-is__item--type-suggestion"
    v-for="(suggestion, index) in suggestResults.suggestions"
    :key="index"
    :url="'/search?q=' + suggestion"
    data-testid="is-product-suggestion"
  >
    <fs-highlight-text
      :search-word="suggestResults.query"
      :text-to-highlight="suggestion"
    />
  </fs-instant-search-item>
</div>
  `,

  "fs-collections": `
<div
  v-if="isNotEmpty"
  class="flashsearch-is__collections-wrapper"
>
  <div class="flashsearch-is__label" data-testid="is-label">{{$t("instantSearch.labels.collections")}}</div>
  <fs-instant-search-item
    class="flashsearch-is__item--type-suggestion"
    v-for="(collection, index) in suggestResults.collections"
    :key="index"
    :url="'/collections/' + collection.handle"
    data-testid="is-product-collection"
  >
    <fs-highlight-text
      :search-word="suggestResults.query"
      :text-to-highlight="collection.title"
    />
  </fs-instant-search-item>
</div>
  `,

  "fs-pages": `
<div  v-if="isNotEmpty" class="flashsearch-is__pages-wrapper">
  <div class="flashsearch-is__label" data-testid="is-label">{{$t("instantSearch.labels.pages")}}</div>
  <fs-instant-search-item
    class="flashsearch-is__item--type-suggestion"
    v-for="(page, index) in suggestResults.pages"
    :key="index"
    :url="'/pages/' + page.handle"
    data-testid="is-product-page"
  >
    <fs-highlight-text
      :search-word="suggestResults.query"
      :text-to-highlight="page.title"
    />
  </fs-instant-search-item>
</div>
  `,

  "fs-products": `
<div v-if="isNotEmpty" class="flashsearch-is__product-wrapper">
  <div class="flashsearch-is__label" data-testid="is-label">{{$t("instantSearch.labels.products")}}</div>
  <fs-did-you-mean :suggest-results="suggestResults"/>
  <div class="flashsearch-is__product-item-wrapper">
    <fs-instant-search-product-item
      v-for="(product, index) in suggestResults.products"
      :key="index"
      :product="product"
    />
  </div>
</div>
  `,

  "fs-did-you-mean": `
<div
  v-if="!!suggestResults.didYouMean"
  class="flashsearch-is__did-you-mean-wrapper"
  data-testid="is-dym"
>
  <i18n-t keypath="instantSearch.messages.nothingFound" tag="span">
    <template #searchTerm>
      <span class="flashsearch-is__did-you-mean-query" data-testid="is-dym-st"
      >{{suggestResults.query}}</span>
    </template>
  </i18n-t>
  <i18n-t keypath="instantSearch.messages.didYouMean" tag="span" class="flashsearch-is__did-you-mean-text-wrapper">
    <template #suggestions>
      <span
        class="flashsearch-is__did-you-mean-text"
        @mousedown.prevent=""
        @click.stop.prevent="chooseDidYouMean"
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
  <fs-instant-search-search-bar-mobile
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
  unhighlight-class-name="flashsearch-unhighlight-text"
  :highlight-style="{color: 'inherit'}"
/>
    `,

  "fs-instant-search-item": `
<div @mousedown="onClickItem" class="flashsearch-is__item">
  <slot />
</div>
    `,

  "fs-instant-search-product-item": `
<fs-instant-search-item
  :url="product.url"
  class="flashsearch-is__product-item"
  data-testid="is-product"
  @onClickItem="onClickItem"
>
  <div
    v-if="enableImage"
    class="flashsearch-is__product__image-wrapper"
    data-testid="is-product-image"
  >
    <img
      alt=""
      class="flashsearch-is__product__image"
      :src="product.featuredImage.originalSrc"
    />
  </div>
  <div class="flashsearch-is__product__info-wrapper">
    <div class="flashsearch-is__product__title" data-testid="is-product-title">
      {{product.title}}
    </div>
    <div
      v-if="!!sku && enableSku"
      class="flashsearch-is__product__sku"
      data-testid="is-product-sku"
    >
      {{$t("instantSearch.labels.sku")}}: {{sku}}
    </div>
    <div
      v-if="!!product.vendor && enableVendor"
      class="flashsearch-is__product__vendor"
      data-testid="is-product-vendor"
    >
      {{product.vendor}}
    </div>
    <fs-price
      class="flashsearch-is__product__price"
      :on-sale="onSale"
      :price="product.priceMin"
      :compare-at-price="product.compareAtPriceMin"
      :enable-price="enablePrice"
      :enable-compare-at-price="enableCompareAtPrice"
      data-testid-prefix="is"
    />
  </div>
</fs-instant-search-item>
    `,

  "fs-instant-search-search-bar-mobile": `
<div
  id="flashsearch-is-searchbar-mobile"
  class="flashsearch-is__searchbar-mobile-wrapper"
  v-show="enable"
>
  <div class="flashsearch-is__searchbar-mobile__background" />
  <div class="flashsearch-is__searchbar-mobile__input-wrapper">
    <div
      class="flashsearch-is__searchbar-mobile__back-icon"
      @click.prevent="goBack"
    >
      <fs-arrow-left-outlined />
    </div>
    <div class="flashsearch-is__searchbar-mobile__input-form-wrapper">
      <form>
        <input
          class="flashsearch-is__searchbar-mobile__input"
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
