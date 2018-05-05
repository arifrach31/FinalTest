import React,{Component} from 'react'
import {
    Container, Content, Text,
    Card, CardItem, Body,
    Header,
    Left,
    Right, Button, Icon,
    Spinner
} from 'native-base'
import {View, StyleSheet, Image} from 'react-native'
import { connect } from 'react-redux'

import ProfileRow from '../components/ProfileRow'
import {allProfiles} from '../actions/profiles'
import {allHighlights} from '../actions/highlights'

class ProfileList extends Component{
    
    componentDidMount(){
        this.props.dispatch(allProfiles())
        this.props.dispatch(allHighlights())

    }
    render(){
        return(
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Text>Profile List</Text>
                        </Body>
                    <Right>
                        <Button onPress={()=>this.props.navigation.navigate('AddProfile')}>
                            <Text>Add Report</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.props.profilesReducer.profiles.isLoading ? (<Spinner color="#ffffff" />)
                        : (
                            <View>
                            <Image style={styles.img}
                                source={require('../assets/images/profile.png')}
                            />
                                <Card style={styles.profileGroup} >
                                    <View>
                                        
                                        {this.props.profilesReducer.profiles.map((n)=>( 
                                                <CardItem key={n.objectId} style={styles.profile} >
                                                    <Left style={styles.left}/>
                                                    <Body style={styles.body}>
                                                    <Button transparent style={styles.btnUpdate} onPress={()=> this.props.navigation.navigate('UpdateProfile', {id: n.objectId})} {...this.props}>
                                                        <Text>Update</Text>
                                                    </Button>
                                                        <Text style={styles.name}>{n.name}</Text>
                                                        <Text>{n.headline}</Text>
                                                        <Text>{n.academy + ' - ' + n.location}</Text>
                                                        <Text>{n.country + ' * ' + n.connections} <Icon name="people" /></Text>
                                                        <View style={styles.btnGroup}>
                                                            <Button bordered style={styles.btnMsg}>
                                                                <Text style={styles.text}>MESSAGE</Text>
                                                            </Button>
                                                            <Button primary style={styles.btn}>
                                                                <Text>CONNECT</Text>
                                                            </Button>
                                                        </View>
                                                        <Text style={styles.summary}>{n.summary}</Text>
                                                    </Body>
                                                    <Right style={styles.right}/>
                                                </CardItem>
                                        ))}
                                    </View>
                                </Card>
                                <Card>
                                    <Text style={styles.title}>Highlights</Text>
                                    {this.props.highlightsReducer.highlights.map((n)=>(
                                        <ProfileRow item={n} {...this.props} key={n.objectId}/>
                                    ))}
                                </Card>
                            </View>
                        )}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    profilesReducer: state.profilesReducer,
    highlightsReducer: state.highlightsReducer
});
  
export default connect(mapStateToProps)(ProfileList)

const styles = StyleSheet.create({
    btnUpdate: {
        alignSelf: 'flex-end',
    },
    name: {
        fontWeight: 'bold',
        letterSpacing: 2
    },
    img: {
        position: 'absolute',
        zIndex: 5,
        width: 100,
        height: 100,
        marginTop: 50,
        alignSelf: 'center',
    },
    profileGroup: {
        flex: 1,
        marginTop: 100,
        zIndex: 1
    },

    profile: {
        flex: 1,
        zIndex: 1,
    },
    
    text: {
        color: '#0073b1'
    },
    title: {
        paddingTop: 10,
        paddingLeft: 10,
        color: '#727171',
        fontSize: 15
    },
    left: {
        flex: 1
    },
    body: {
        zIndex: 0,
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    summary: {
        alignItems: 'center'
    },
    btnGroup: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    btnMsg: {
        marginRight: 5,
        borderColor: '#0073b1',
        height:30
    },
    btn: {
        marginRight: 5,
        backgroundColor: '#0073b1',
        height:30
    },
    right: {
        flex: 1
    }
    

    
})