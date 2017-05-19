/**
 * Created by Colin on 2017/5/18.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')

export default class TabBar extends React.Component {
    static propType = {
        goToPage: React.PropTypes.func,//react-native-scrollable-tab-view内属性
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,

        tabNames: React.PropTypes.array,
        tabIconNames: React.PropTypes.array
    };

    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({value}) {
        console.log(value);
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? 'red' : 'gray';
                    let icon = this.props.activeTab == i ? this.props.selectedTabIconNames[i] : this.props.tabIconNames[i];
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.tab}
                            onPress={()=>this.props.goToPage(i)}
                        >
                            <View style={styles.tabItem}>
                                <Image
                                    style={styles.icon}
                                    source={icon}
                                />
                                <Text style={{color: color, fontSize: 12}}>
                                    {this.props.tabNames[i]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 49,
        borderTopColor: '#d9d9d9',
        borderTopWidth: StyleSheet.hairlineWidth
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    icon: {
        width: 26,
        height: 26,
        marginBottom: 2
    }
});