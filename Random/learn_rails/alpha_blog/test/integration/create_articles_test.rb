require 'test_helper'

class CreateArticlesTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(username: "john", email: "john@example.com", password: "password", admin: true)
  end

  test "get new article path and create article" do
    sign_up_as(@user, "password")

    get new_article_path
    assert_template 'articles/new'

    assert_difference 'Article.count', 1 do
      post_via_redirect articles_path, article: {
         title: "Foo bar", description: "The quick brown fox jumps over the lazy dog"
       }
     end

     assert_template 'articles/show'
     assert_match 'Foo bar', response.body
  end
end
