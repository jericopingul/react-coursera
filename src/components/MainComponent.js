import React, { Component } from 'react';
import Home from './HomeComponent'
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators'
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) } ,
  fetchComments: () => { dispatch(fetchComments()) } ,
  fetchPromos: () => { dispatch(fetchPromos()) } ,

  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes(); // fetches dishes and loads it to redux store to be available to application
    this.props.fetchComments(); 
    this.props.fetchPromos(); 
  }

  render() {
    const HomePage = () => {
      const { dishes, promotions, leaders } = this.props;
      return(
        <Home dish={dishes.dishes.filter(dish => dish.featured)[0]}
              dishesLoading={dishes.isLoading}
              dishesErrMess={dishes.errMess}
              promotion={promotions.promotions.filter(promo => promo.featured)[0]}
              promosLoading={promotions.isLoading}
              promosErrMess={promotions.errMess}
              leader={leaders.filter(leader => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
      const { dishes, comments } = this.props;
      return(
        <DishDetail 
          dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          isLoading={dishes.isLoading}
          errMess={dishes.errMess}
          comments={comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={comments.errMess}
          postComment={this.props.postComment}
        />
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
