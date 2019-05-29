/**
 * 静态配置
 */
export class Config {
  /**
   * 分页条
   */
  static pagination = {
    /**
     * 调用后端api时，第一页的pageIndex值，默认：1。
     * 有些项目，第一页pageIndex为0。
     */
    startPageIndex: 1,
    /**
     * 调用后端api时，pageIndex字段名称，默认：pageIndex。
     * 有些项目是 page_index。
     */
    pageIndexFieldName: 'pageIndex',
    /**
     * 调用后端api时，pageSize字段名称，默认：pageSize。
     * 有些项目是 page_size。
     */
    pageSizeFieldName: 'pageSize',
    /**
     * 默认分页大小
     */
    pageSize: 10,
  };

  /**
   * 按钮
   */
  static button = {
    size: 'small',
  };
}
