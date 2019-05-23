# bph

本工具基于react, dva, antd
为方便开发列表的增删改查功能。



# 功能点
## 1. 条件
用户可以通过下面代码添加条件
```typescript
  renderCondition = () => {
    const {
      tableCardState: { condition },
    } = this.props;
    const conditionItems: IConditionItem[] = [
      ConditionItem({ title: '编号', field: 'id', initialValue: '' }),
      ConditionItem({ title: '部门名称', field: 'name', initialValue: '' }),
      undefined,
    ];
    return conditionItems;
  };
```

## 2. 操作按钮
默认情况下，操作按钮有 新增，删除2个按钮。
用户可以通过下面代码添加新的按钮
```typescript
renderActionBar() {
  return [
    <Button key="check" onClick={() => console.log('审核')}>
      审核
    </Button>,
  ];
}
```

## 3. 列表
列表是用antd 的 Table封装。 
```typescript
render() {
  const tableCardConfig: ITableCardBaseConfig = {
    namespace: NAMESPACE, // 对应 model 的 NAMESPACE
    rowKey: 'id', // 数据主键，必须唯一。
    addButtonState: { visible: true, disabled: false }, // 操作按钮栏上，新增按钮是否可见/可用
    downloadButtonState: { visible: true, disabled: false }, // 条件栏上，下载按钮是否可见/可用
    deleteButtonState: { visible: true, disabled: false }, // 操作按钮栏上，删除按钮是否可见/可用
    scroll: { y: 500 }, // 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，可以设置为像素值，百分比，true 和 'max-content'
    crossPageSelect: true, // 是否跨页选择
    pagination: {
      position: 'flex-start', // 分页条位置
    },
    filledParentNode: true, // 是否将表格充满整个容器
    autoSearch: true, // 页面加载完时，是否自动调用查询
    checkBox: true, // 数据行前是否显示复选框
    onRow: (record: IHash, index: number) => {
      return {
        style: {
          color: index % 2 ? '#ff0000' : '#00ff00',
        },
      };
    },
    columns: [
      {
        title: '编号',
        dataIndex: 'id',
        width: 340,
        // fixed: 'left',
        sorter: true,
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: 200,
        // fixed: 'left',
        sorter: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        sorter: true,
      },
      {
        title: '操作',
        width: 180,
        render: (text, record, index) => {
          if (!this.tableCardBaseRef.current) {
            return null;
          }
          const { onEdit, onDelete, onCopy } = this.tableCardBaseRef.current;
          return (
            <OptionContainer splitLine={false}>
              <TextButton data={record} onClick={onEdit}>
                编辑
              </TextButton>
              <TextButton data={record} onClick={this.onOpenUser}>
                员工
              </TextButton>
              <TextButton data={record} onClick={onDelete}>
                删除
              </TextButton>
            </OptionContainer>
          );
        },
      },
    ],
  };

  return (
    <TableCardBase
      ref={this.tableCardBaseRef}
      tableCardConfig={tableCardConfig}
      renderCondition={this.renderCondition}
      renderActionBar={this.renderActionBar}
      renderEditor={this.renderEditor}
      {...this.props}
    />
  );
}
```

## 4. 添加/编辑
用户可以通过下面代码添加弹框进行数据的添加编辑
```typescript
renderEditor() {
  return <Editor />;
}
```




# demo
本例中有2个页面，部门管理，员工管理
1. 部门管理 -- 源代码：src/pages/page.department
2. 用户管理 -- 源代码：src/pages/page.user





