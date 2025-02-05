import BookIcon from '@material-ui/icons/Book';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import React, { Children, cloneElement } from 'react';
import {
  BulkActions,
  BulkDeleteAction,
  Filter,
  List,
  Responsive,
  SimpleList,
  TextField,
  TextInput,
  translate,
  DateField,
  BooleanField,
  NumberField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  EditButton,
  ShowButton,
  Datagrid
} from 'react-admin'; // eslint-disable-line import/no-unresolved

import {ProgressField} from '../../../src'

import ResetViewsAction from './ResetViewsAction';
export const PostIcon = BookIcon;


const statusData = ['arrived','initiated','completed'];

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const PostFilter = props => (
  <Filter {...props}>
    <TextInput
      label="post.list.search"
      source="q"
      alwaysOn
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="disabled" />
          </InputAdornment>
        ),
      }}
    />
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />
    <QuickFilter label="resources.posts.fields.commentable" source="commentable" defaultValue />
  </Filter>
);

const styles = theme => ({
  title: {
    maxWidth: '5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  progress: {
    maxWidth: '20em'
    
  },
  hiddenOnSmallScreens: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  publishedAt: { fontStyle: 'italic' },
});

const PostListBulkActions = props => (
  <BulkActions {...props}>
    <ResetViewsAction label="simple.action.resetViews" />
    <BulkDeleteAction />
  </BulkActions>
);

const PostListActionToolbar = withStyles({
  toolbar: {
    alignItems: 'center',
    display: 'flex',
  },
})(({ classes, children, ...props }) => (
  <div className={classes.toolbar}>
    {Children.map(children, button => cloneElement(button, props))}
  </div>
));

const PostList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    bulkActions={<PostListBulkActions />}
    filters={<PostFilter />}
    sort={{ field: 'published_at', order: 'DESC' }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.title}
          secondaryText={record => `${record.views} views`}
          tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
        />
      }
      medium={
        <Datagrid>
          <TextField source="id" />
          <TextField source="title" cellClassName={classes.title} />
          <ProgressField source="events" data={statusData} cellClassName={classes.progress}/>
          <DateField source="published_at" cellClassName={classes.publishedAt} />
          <BooleanField
            source="commentable"
            label="resources.posts.fields.commentable_short"
            sortable={false}
          />
          <NumberField source="views" />

          <PostListActionToolbar>
            <EditButton />
            <ShowButton />
          </PostListActionToolbar>
        </Datagrid>
      }
    />
  </List>
));

export default PostList;
