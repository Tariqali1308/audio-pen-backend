module.exports = {
  getPagination: async (
    modal,
    records_per_page = 0,
    page_no = 1,
    query = {}
  ) => {
    try {
      const skipPage = parseInt(page_no) - 1;
      const limitPage = parseInt(records_per_page);
      const skipDocuments = skipPage * limitPage;
      const totalNumberOfDocuments = await modal.countDocuments(query);
      return {
        recordsPerPage: records_per_page,
        skipDocuments,
        totalNumberOfDocuments,
      };
    } catch (e) {
      console.log("er", e);
      return false;
    }
  },
};
