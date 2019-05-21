# bph

本工具基于react, dva。
为方便开发列表的增删改查功能。


# 功能点
## 1. 条件
```typescript
  renderCondition = () => {
    const {
      tableCardState: { condition },
    } = this.props;
    const conditionItems: IConditionItem[] = [
      ConditionItem({ title: '部门名称', field: 'name', initialValue: '' }),
      undefined,
    ];
    return conditionItems;
  };
```
## 2. 列表
## 3. 分页

## 4. 添加
## 5. 编辑
## 6. 删除


# demo
本例中有2个页面，部门管理，员工管理
1. 部门管理 -- 源代码：src/pages/page.department
2. 用户管理 -- 源代码：src/pages/page.user





