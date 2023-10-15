export default function LogoutButton() {
  return (
    <form action='/auth/signout' method='post'>
      <button className='hover:text-gray-500'>退出登录</button>
    </form>
  )
}
