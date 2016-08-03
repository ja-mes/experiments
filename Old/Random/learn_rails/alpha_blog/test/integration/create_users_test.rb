require 'test_helper'

class CreateUsersTest < ActionDispatch::IntegrationTest
  test "get signup form and create user" do
    get signup_path
    assert_template 'users/new'

    assert_difference 'User.count', 1 do
      post_via_redirect users_path, user: { username: "foo", email: "foo@bar.com", password: "password" }
    end

    assert_template 'users/show'
    assert_match "foo", response.body

  end
end
