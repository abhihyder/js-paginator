"use strict";

function paginate() {
  let query = {};
  let totalPages = 0;
  let params = {
    currentPage: 1,
    limit: 10,
    totalItem: 0,
    baseUrl: "",
  };

  /**
   * @param paginateParams Object
   * @param reqQuery Object
   * @return Object
   */
  return (paginateParams = {}, reqQuery = {}) => {
    updateParams(paginateParams, reqQuery);

    const isFirstPage = params.currentPage == 1;
    const isLastPage = params.currentPage == totalPages;
    const prev = !isFirstPage
      ? buildUrl({ ...query, page: params.currentPage - 1 })
      : null;
    const next = !isLastPage
      ? buildUrl({ ...query, page: params.currentPage + 1 })
      : null;

    const response = {
      currentPage: params.currentPage,
      totalPages: totalPages,
      from: params.totalItem > 0 ? (params.currentPage - 1) * params.limit + 1 : 0,
      to: Math.min(params.currentPage * params.limit, params.totalItem),
      totalItem: params.totalItem,
      links: {
        first: buildUrl({ ...query, page: 1 }),
        last: buildUrl({ ...query, page: totalPages }),
        prev: prev,
        next: next,
      },
      pagination: [],
    };

    response.pagination = getPagination();
    return response;
  };

  function updateParams(paginateParams, reqQuery) {
    params = {
      ...params,
      ...paginateParams,
    };
    query = reqQuery;
    params.limit = Math.max(parseInt(params.limit) || 10, 1);
    totalPages = Math.max(
      Math.ceil(parseInt(params.totalItem) / parseInt(params.limit)),
      1
    );
    params.currentPage = Math.min(
      Math.max(parseInt(params.currentPage), 1),
      totalPages
    );
  }

  function getPagination() {
    if (totalPages < 1) return [];

    // Generate pagination links based on total pages
    if (totalPages <= 10) {
      return generatePaginationLinks(range(1, totalPages));
    }

    return generateAdjacentPaginationLinks();
  }

  // Function to generate pagination links for adjacent pages
  function generateAdjacentPaginationLinks() {
    const slot = getSlot();

    const pagination = [];

    if (hasDuplicates(slot.first, slot.second)) {
      pagination.push(
        ...generatePaginationLinks(uniqueValues(slot.first, slot.second))
      );
    } else {
      pagination.push(
        ...generatePaginationLinks(slot.first),
        { page: "...", url: null },
        ...generatePaginationLinks(slot.second.slice(slot.adjacentPages - 1))
      );
    }

    if (hasDuplicates(slot.second, slot.third)) {
      pagination.push(
        ...generatePaginationLinks(
          slot.third.filter((value) => !slot.second.includes(value))
        )
      );
    } else {
      pagination.push(
        { page: "...", url: null },
        ...generatePaginationLinks(slot.third.slice(slot.adjacentPages - 1))
      );
    }

    return pagination;
  }

  // Function to generate pagination links
  function generatePaginationLinks(pages) {
    return pages.map((page) => ({
      page,
      url: buildUrl({ ...query, page }),
    }));
  }

  function getSlot() {
    const adjacentPages = 3;

    const secondSlotStart = Math.max(params.currentPage - adjacentPages, 1);
    const secondSlotEnd = Math.min(params.currentPage + 1, totalPages);

    const thirdSlotStart = totalPages - adjacentPages;
    const thirdSlotEnd = totalPages;

    return {
      first: range(1, 2),
      second: range(secondSlotStart, secondSlotEnd),
      third: range(thirdSlotStart, thirdSlotEnd),
      adjacentPages,
    };
  }

  // Function to build URL with query parameters
  function buildUrl(reqQuery) {
    const queryString = new URLSearchParams(reqQuery).toString();
    return `${params.baseUrl}?${queryString}`;
  }

  function hasDuplicates(array1, array2) {
    return array1.reduce((hasDuplicate, currentValue) => {
      if (hasDuplicate) {
        return true;
      }
      return array2.includes(currentValue);
    }, false);
  }

  function uniqueValues(array1, array2) {
    // Concatenate the arrays and create a Set to remove duplicate values
    const uniqueSet = new Set([...array1, ...array2]);
    // Convert the Set back to an array
    return Array.from(uniqueSet);
  }

  function range(start, end) {
    let result = [];
    // Determine the direction of the range (incrementing or decrementing)
    let direction = start <= end ? 1 : -1;
    for (let i = start; direction * i <= direction * end; i += direction) {
      result.push(i);
    }
    return result;
  }
}

module.exports = paginate();
