import React from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
import './styles.less';
import { FormComponentProps } from 'antd/lib/form';
import { IHash } from '../../../interface/iHash';
import { IConditionItem } from '../conditionItem/interface';
import { IActionButtonState } from '../actionBar/interface';

interface IProps extends FormComponentProps {
  conditionItems: IConditionItem[];
  onRefresh: () => void;
  onSearch: (condition: IHash) => void;
  onDownload: (condition: IHash) => void;
  downloadButtonState?: IActionButtonState;
  /**
   * 是否在组件加载完成后自动调用search方法，默认: true
   */
  autoSearch?: boolean;
  /**
   * 条件折叠与否变化时
   */
  onCollapsed?: (isCollapsed: boolean) => void;
}

class Component extends React.PureComponent<IProps> {
  state = {
    isCollapsed: true,
  };
  onSearch = () => {
    const { onSearch, form } = this.props;
    if (onSearch) {
      form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        onSearch(fieldsValue);
      });
    }
  };
  onRefresh = () => {
    const { onRefresh, form } = this.props;
    if (onRefresh) {
      onRefresh();
    }
  };
  onDownload = () => {
    const { onDownload, form } = this.props;
    if (onDownload) {
      form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        onDownload(fieldsValue);
      });
    }
  };
  onConditionReset = () => {
    const { onSearch, form } = this.props;
    form.resetFields();
    if (onSearch) {
      form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        onSearch(fieldsValue);
      });
    }
  };
  onCollapsed = () => {
    this.setState(
      {
        isCollapsed: !this.state.isCollapsed,
      },
      () => {
        const { onCollapsed } = this.props;
        if (onCollapsed) {
          onCollapsed(!this.state.isCollapsed);
        }
      },
    );
  };
  componentDidMount() {
    const { autoSearch } = this.props;
    if (autoSearch !== false) {
      this.onRefresh();
    }
  }
  render() {
    const {
      form: { getFieldDecorator },
      conditionItems = [],
      downloadButtonState,
    } = this.props;

    const { isCollapsed } = this.state;
    const cItems = conditionItems.filter(h => h !== undefined);

    return (
      <div className={`bph_condition`}>
        <Form onSubmit={this.onSearch}>
          <Row gutter={0}>
            {cItems.map((item, index) => (
              <Col
                xl={6}
                lg={8}
                md={12}
                sm={24}
                key={item.field}
                style={{
                  display: item.visible && (!isCollapsed || index < 3) ? undefined : 'none',
                }}
              >
                <Form.Item label={item.title} className={'bph_form_item'}>
                  {getFieldDecorator(item.field, { initialValue: item.initialValue })(
                    item.component,
                  )}
                </Form.Item>
              </Col>
            ))}

            <Col xl={6} lg={8} md={12} sm={24}>
              <span className={`bph_submitButtons`}>
                <Button type="primary" onClick={this.onSearch} icon="search">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.onConditionReset} icon="undo">
                  重置
                </Button>
                {downloadButtonState && downloadButtonState.visible && (
                  <Button
                    style={{ marginLeft: 8 }}
                    onClick={this.onDownload}
                    icon="download"
                    disabled={downloadButtonState.disabled}
                  >
                    下载
                  </Button>
                )}

                {cItems.length > 3 &&
                  (isCollapsed ? (
                    <a style={{ marginLeft: 8 }} onClick={this.onCollapsed}>
                      展开
                      <Icon type="down" />
                    </a>
                  ) : (
                    <a style={{ marginLeft: 8, whiteSpace: 'nowrap' }} onClick={this.onCollapsed}>
                      收起
                      <Icon type="up" />
                    </a>
                  ))}
              </span>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export const Condition = Form.create()(Component);
