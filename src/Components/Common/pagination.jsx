import React from "react";
import { Table, Icon, Menu } from "semantic-ui-react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const {
    itemCount,
    pageSize,
    currentPage,
    onPreviousPageChange,
    onPageChange,
    onNextPageChange
  } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="3">
          <Menu floated="right" pagination>
            {currentPage !== 1 && (
              <Menu.Item
                as="a"
                icon
                onClick={() => onPreviousPageChange(currentPage)}
              >
                <Icon name="chevron left" />
              </Menu.Item>
            )}
            {pages.map(page => (
              <Menu.Item as="a" key={page} onClick={() => onPageChange(page)}>
                {page}
              </Menu.Item>
            ))}
            {currentPage !== pageCount && (
              <Menu.Item
                as="a"
                icon
                onClick={() => onNextPageChange(currentPage)}
              >
                <Icon name="chevron right" />
              </Menu.Item>
            )}
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default Pagination;
