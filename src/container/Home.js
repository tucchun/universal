import React, { Component } from "react";
import { connect } from "react-redux";
import { getHomeList } from "../store/home/actions";
import WithStyle from '../withStyle'
import styles from  './styles.css';
import { Helmet } from 'react-helmet'
// import { DatePicker } from 'antd'

class Home extends Component {

  static loadData(store) {
    return store.dispatch(getHomeList())
  }

  // componentWillMount() {
  //   const { staticContext } = this.props
  //   if (staticContext) {
  //     staticContext.css.push(styles._getCss())
  //   }
  // }

  render() {
    const { list = [] } = this.props;
    console.log("list", list);
    return (
      <>
        <Helmet>
          <title>tucchun home</title>
          <meta name="description" content="tucchun home" />
        </Helmet>
        <h1>hello</h1>
        {list.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </>
    );
  }

  componentDidMount() {
    console.log('componentDidMount', this.props, this.props.list.length)
    if (!this.props.list.length) {
      this.props.getHomeList();
    }
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps', state)
  return {
    list: state.home.list
  };
};

const mapDisatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList());
  }
});


export default connect(mapStateToProps, mapDisatchToProps)(WithStyle(Home, styles));
