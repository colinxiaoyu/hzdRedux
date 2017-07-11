/**
 * Created by Colin on 2017/6/13.
 */
import React from 'react';
import {
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';


const {width, height}=Dimensions.get('window');
const addIcon = require('./img/ic_add_img.png');

const options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class AddImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: undefined,
            hasImage: false,
        }
    }

    _addImage = ()=> {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                    hasImage: true
                });
            }
        });
    };

    render() {
        return (<View style={styles.container}>
            {
                this.state.hasImage ? <View style={styles.content}>
                    <Image source={this.state.avatarSource}
                           resizeMode="contain"
                           style={styles.showImage}>
                    </Image>
                </View> :
                    <View>
                        <TouchableOpacity
                            style={styles.content}
                            onPress={()=>this.props.onPress()}>
                            <Image
                                resizeMode='contain'
                                style={styles.addImage}
                                source={addIcon}/>
                            <Text style={styles.texts}>{this.props.text}</Text>
                        </TouchableOpacity>
                    </View>
            }
        </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 160,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        margin: 20,
        height: 160,
        width: width - 20 * 2,
        borderRadius: 8,
        backgroundColor: '#BFBFBF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addImage: {
        width: 80,
        height: 80,
    },
    showImage: {
        height: 160,
        width: width - 20 * 2
    },
    texts: {
        marginTop: 10,
        fontSize: 14
    }
});