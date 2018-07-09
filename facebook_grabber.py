import requests
import json
import facebook
import login_helper as login
AUTH_TOKEN = login.getCredentials('facebook','auth-token')
PAGE_ID = login.getCredentials('facebook','page-id')
graph = facebook.GraphAPI(access_token = AUTH_TOKEN)
page = graph.get_object(id=PAGE_ID,fields='fan_count')

def getLikes():
	return graph.get_object(id=PAGE_ID,fields='fan_count').get('fan_count')

def printLikes():
	print ("Facebook Likes = " + str(getLikes()) + "Likes ")

print (getLikes())