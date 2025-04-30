import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const DeviceInfoExample = () => {
    const [deviceInfo, setDeviceInfo] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetchDeviceInfo = async () => {
            const info = {
                batteryLevel: await DeviceInfo.getBatteryLevel(),
                isEmulator: await DeviceInfo.isEmulator(),
                isTablet: DeviceInfo.isTablet(),
                deviceName: await DeviceInfo.getDeviceName(),
                deviceId: DeviceInfo.getDeviceId(),
                systemName: DeviceInfo.getSystemName(),
                systemVersion: DeviceInfo.getSystemVersion(),
                appVersion: DeviceInfo.getVersion(),
                appName: DeviceInfo.getApplicationName(),
                appBuildNumber: DeviceInfo.getBuildNumber(),
                uniqueId: await DeviceInfo.getUniqueId(),
                totalMemory: await DeviceInfo.getTotalMemory(),
                usedMemory: await DeviceInfo.getUsedMemory(),
                hasNotch: DeviceInfo.hasNotch(),
                isLandscape: await DeviceInfo.isLandscape(),
                deviceManufacturer: await DeviceInfo.getManufacturer(),
                deviceModel: DeviceInfo.getModel(),
                deviceBrand: DeviceInfo.getBrand(),
                deviceCarrier: await DeviceInfo.getCarrier(),
                deviceSerialNumber: await DeviceInfo.getSerialNumber(),
                deviceFingerprint: await DeviceInfo.getFingerprint(),
                deviceHardware: await DeviceInfo.getHardware(),
                deviceHost: await DeviceInfo.getHost(),
                deviceProduct: await DeviceInfo.getProduct(),
                deviceType: await DeviceInfo.getType(),
                deviceBuildId: await DeviceInfo.getBuildId(),
                deviceBootloader: await DeviceInfo.getBootloader(),
                deviceTags: await DeviceInfo.getTags(),
                androidId: await DeviceInfo.getAndroidId(),
                apiLevel: await DeviceInfo.getApiLevel(),
                baseOs: await DeviceInfo.getBaseOs(),
                codename: await DeviceInfo.getCodename(),
                device: await DeviceInfo.getDevice(),
                display: await DeviceInfo.getDisplay(),
                firstInstallTime: await DeviceInfo.getFirstInstallTime(),
                freeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
                freeDiskStorageOld: await DeviceInfo.getFreeDiskStorageOld(),
                ipAddress: await DeviceInfo.getIpAddress(),
                macAddress: await DeviceInfo.getMacAddress(),
                maxMemory: await DeviceInfo.getMaxMemory(),
                readableVersion: DeviceInfo.getReadableVersion(),
                securityPatch: await DeviceInfo.getSecurityPatch(),
                totalDiskCapacity: await DeviceInfo.getTotalDiskCapacity(),
                totalDiskCapacityOld: await DeviceInfo.getTotalDiskCapacityOld(),
                userAgent: await DeviceInfo.getUserAgent(),
                isBatteryCharging: await DeviceInfo.isBatteryCharging(),
                isHeadphonesConnected: await DeviceInfo.isHeadphonesConnected(),
                isWiredHeadphonesConnected: await DeviceInfo.isWiredHeadphonesConnected(),
                isBluetoothHeadphonesConnected: await DeviceInfo.isBluetoothHeadphonesConnected(),
                isPinOrFingerprintSet: await DeviceInfo.isPinOrFingerprintSet(),
                supportedAbis: await DeviceInfo.supportedAbis(),
            };
            setDeviceInfo(info);
        };

        fetchDeviceInfo();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {Object.entries(deviceInfo).map(([key, value]) => (
                <View key={key} style={styles.infoRow}>
                    <Text style={styles.key}>{key}:</Text>
                    <Text style={styles.value}>{String(value)}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgb(189, 223, 229)',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    key: {
        fontWeight: 'bold',
        marginRight: 8,
    },
    value: {
        flex: 1,
    },
});
