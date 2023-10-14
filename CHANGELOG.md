# 2023/10/14 Version 0.1.1

## Fixs

1. 修改Supabase所有表中时间为UTC时间，在程序中使用toLocaleString获取正确的本地时间；
2. 修复`lib/actions/BuyAction.ts`中缺少sell_id导致个人页面订单部门出现property is null错误；

## Features

1. 支持通过邮件通知双方交易状态。