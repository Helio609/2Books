# 2023/10/15 Version 0.1.2

## Fixs

1. 优化在移动设备上的显示，将组件的宽度改为自适应，将flex改为grid，并设置相应的显示断点: 
[cfedcb8](https://github.com/Helio609/2Books/commit/cfedcb8f7940aa11c7a67e174ffba42cce8350f2)
[0e40868](https://github.com/Helio609/2Books/commit/0e408684eceb07124e53060be74ba8d107959f87)
[2dcb78d](https://github.com/Helio609/2Books/commit/2dcb78d88ef94d88b35e477349846b8198dda6d4);
2. 修复了总是redirect到localhost:3000的问题，具体见: [f57ec77](https://github.com/Helio609/2Books/commit/f57ec77db04b4212bcec9da82cbb5a39cbc02d83);
3. fix(BuyAction): getURL needs a bracket: [26b5181](https://github.com/Helio609/2Books/commit/26b5181462b237e67458a31cf9cfea001e7bf195)；
4. fix(profile): When grade is null, do the right: [873c574](https://github.com/Helio609/2Books/commit/873c574a6c04cf3d9bc3873f6dac3dadb2e8230a)。

# 2023/10/14 Version 0.1.1

## Fixs

1. 修改Supabase所有表中时间为UTC时间，在程序中使用toLocaleString获取正确的本地时间；
2. 修复`lib/actions/BuyAction.ts`中缺少sell_id导致个人页面订单部门出现property is null错误；

## Features

1. 支持通过邮件通知双方交易状态。