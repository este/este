#goog.provide 'utils.Discuss'
#
#if (!XMLHttpRequest)
#  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
#
##
##     * HTTP Request builder - decorator pattern.
##     * @param d - Reference to the parent Discuss object
##     * @param method - Object declaring the HTTP method name and properties
##     * @param path - The path portion of the URL to send the request to
##     
#Request = (d, method, path) ->
#  @d = d
#  @method = method
#  @path = path
#  return
#
#
##
##     * Declare request headers in Object (key/value) format
##     * @param - Request headers (key/value)
##     * @return Request instance
##     
#Request::header = (reqHeaders) ->
#  @reqHeaders = reqHeaders  if typeof reqHeaders is "object"
#  this
#
#
##
##     * Declare a Query string in standard URL query format or by providing an object with
##     * key/value pairs. Query will only be set if the HTTP method supports it (GET/DELETE/HEAD).
##     * @param _query - Query string or Object
##     * @return Request instance
##     
#Request::query = (_query) ->
#  @_query = _query  if @method.query and (typeof _query is "object" or typeof _query is "string")
#  this
#
#
##
##     * Declare a request body in Object or String format. For objects, the 'application/json'
##     * header will be automatically added during sending. Body will oly be set if the HTTP
##     * method supports it (POST/PUT).
##     * @param _body - Object or string content for the HTTP request
##     * @return Request instance
##     
#Request::body = (_body) ->
#  @_body = _body  if @method.body and (typeof _body is "object" or typeof _body is "string")
#  this
#
#
##
##     * Declare a callback to be called when the HTTP request is successful. The callback will
##     * be triggered with the following signature: (body, status, responseHeaders), where the
##     * body and responseHeaders will be parsed into Objects if the 'autoParse' option is enabled.
##     * @param onSuccess - A function to be called after successful HTTP request
##     * @return Request instance
##     
#Request::success = (onSuccess) ->
#  @onSuccess = onSuccess
#  this
#
#
##
##     * Declare a callback to be called when the HTTP request has encountered an error, server side
##     * or local. The callback will be triggered with the following signature: (error, status, responseHeaders),
##     * where the error and response headers will be parsed into Objects if the 'autoParse' option is enabled.
##     * @param onError - A function to be called after an unsuccessful HTTP request
##     * @return Request instance
##     
#Request::error = (onError) ->
#  @onError = onError
#  this
#
#
##
##     * Send the request after building it.
##     
#Request::send = ->
#  self = this
#  (->
#    self.d.send self
#    return
#  )()
#  return
#
#Utilities = {}
##
##     * Build an XMLHttpRequest object based on the user agent and CORS options
##     * @return XMLHttpRequest
##     
#Utilities.buildXHR = (isCorsEnabled, isCorsWithCredentialsEnabled) ->
#  return new XDomainRequest()  if isCorsEnabled and typeof XDomainRequest isnt "undefined"
#  xhr = new XMLHttpRequest()
#  if isCorsEnabled and ("withCredentials" not of xhr)
#    throw new Error("CORS is not supported by this user agent")
#  else xhr.withCredentials = "true"  if isCorsEnabled and isCorsWithCredentialsEnabled and "withCredentials" of xhr
#  xhr
#
##
##     * Build a request header object by combining all declared headers. Will automatically
##     * populate the Content-Type header as long as the Body type is an object or string.
##     * @param discussHeaders - An object of header key/values declared on the Discuss object
##     * @param requestHeaders - An object of header key/values declared on the Request object
##     * @param bodyType - The object type (typeof) of the HTTP request content
##     * @param charset - The encoding to declare for a request body that is a string
##     * @return An object containing all compiled headers
##
#
#Utilities.buildHeaders = (discussHeaders, requestHeaders, bodyType, charset) ->
#  compiledHeaders = {}
#  for defaultHeader of discussHeaders
#    compiledHeaders[defaultHeader] = discussHeaders[defaultHeader]  if discussHeaders.hasOwnProperty(defaultHeader)
#  if bodyType is "object"
#    compiledHeaders["Content-Type"] = "application/json"
#  else compiledHeaders["Content-Type"] = "text/html; charset=" + charset  if bodyType is "string"
#  for newHeader of requestHeaders
#    compiledHeaders[newHeader] = requestHeaders[newHeader]  if requestHeaders.hasOwnProperty(newHeader)
#  compiledHeaders
#
#
##
##     * Build a valid query string from an Object or from a properly formatted query string. 
##     * @param query - A query string or Object (key/value)
##     * @return A valid query string
##     
#Utilities.buildQueryString = (query) ->
#  if typeof query is "string" and /^[?](?:(?:(?!=[^?&=])&|(?:[^?&=]+=[^?&=]+))+)*$/.test(query)
#
#    # Test for a query string with a leading question mark
#    return query
#  else if typeof query is "string" and /^(?:(?:(?!=[^?&=])&|(?:[^?&=]+=[^?&=]+))+)*$/.test(query)
#
#    # Add a leading question mark if the query string is otherwise valid
#    return "?" + query
#  else if typeof query is "object" and Object.keys(query).length > 0
#    queryString = ""
#    for p of query
#      if query.hasOwnProperty(p)
#        queryString = queryString + "&"  if queryString
#        queryString = queryString + encodeURIComponent(p) + "=" + encodeURIComponent(query[p])
#    return "?" + queryString
#  ""
#
#
##
##     * Return response headers. If autoParse is enabled, will attempt to parse them into
##     * an object.
##     * @param responseHeaderText - The header text from the HTTP response
##     * @param isAutoParseEnabled - Parse the headers into an object if true
##     * @return A string or an object containing HTTP headers
##     
#Utilities.parseResponseHeaders = (responseHeaderText, isAutoParseEnabled) ->
#  responseHeaders = responseHeaderText
#  if isAutoParseEnabled
#    try
#      headers = {}
#      lines = responseHeaderText.replace(/\\r\\n/g, "\n").split("\n")
#      for i of lines
#        continue  if lines[i] is ""
#        line = lines[i].trim()
#        splitHeader = line.split(":")
#        headers[splitHeader[0].trim()] = splitHeader[1].trim()
#      responseHeaders = headers
#    catch e
#      console.error "Unable to parse response headers"
#  responseHeaders
#
#
##
##     * Parses the response body into an Object if autoParse is enabled and if the response headers
##     * contain the 'application/json' Content-Type.
##     * @param responseText - The body of the HTTP response
##     * @param responseHeaders - The headers from the HTTP response as a String or an Object (key/value)
##     * @param isAutoParseEnabled - Parse the body into a object if true.
##     * @return A string or an object containing the body of the response
##     
#Utilities.parseResponseBody = (responseText, responseHeaders, isAutoParseEnabled) ->
#  responseBody = responseText
#  if isAutoParseEnabled
#    if (typeof responseHeaders is "object" and "Content-Type" of responseHeaders and responseHeaders["Content-Type"].indexOf("application/json") > -1) or (typeof responseHeaders is "string" and /^Content-Type:.*application\/json.*$/m.test(responseHeaders))
#      try
#        responseBody = JSON.parse(responseBody)
#      catch e
#        console.error "Unable to parse response body"
#  responseBody
#
#
##
##     * Combine portions of a URL.
##     * @param arguments - Arguments to join into a path
##     * @return A concatenated path
##     
#Utilities.joinPaths = ->
#  args = Array::slice.call(arguments_)
#  elements = []
#  for i of args
#    if not args[i] or typeof args[i] is "object" or typeof args[i] is "function"
#      args[i] = ""
#    else if typeof args[i] isnt "string"
#      args[i] = "" + args[i]
#    else args[i] = args[i].match(/(.+)\?.*/)[1]  if /.+\?.*/.test(args[i])
#    matches = args[i].match(/((?:[a-zA-Z]+:\/\/)?[^\/?&=]+)/g)
#    Array::push.apply elements, matches  if matches and matches.length > 0
#  uri = elements.join("/")
#  return "/" + uri  unless /[a-zA-Z]+:\/\/.+/.test(uri)
#  uri
#
#
#class utils.Discuss
#  constructor: (basepath) ->
#    @methods = [
#      {
#        name: "get"
#        query: true
#      }
#      {
#        name: "post"
#        body: true
#      }
#      {
#        name: "put"
#        body: true
#      }
#      {
#        name: "delete"
#        query: true
#      }
#      {
#        name: "head"
#        query: true
#      }
#    ]
#    @basepath = basepath
#    @reqHeaders = {}
#    @options =
#      charset: "utf-8" # Used for encoding when the body to send is a string
#      autoParse: true # Automatic parsing of response object to JSON if the content type is application/json
#      timeout: 30000
#      cors: false
#      corsWithCredentials: false
#
#    @setupMethodHandlers()
#    return
#
#
#  #
#  #     * Decorator for declaring headers that will apply to all HTTP requests sent from this
#  #     * Discuss object.
#  #     * @param reqHeaders - An Object (key/value)
#  #     * @return Discuss instance
#  #     
#  header: (reqHeaders) ->
#    @reqHeaders = reqHeaders  if typeof reqHeaders is "object"
#    this
#
#
#  #
#  #     * Decorator for configuring the Discuss object. See constructor docs for options.
#  #     * @param options - Object (key/value)
#  #     * @return Discuss instance
#  #     
#  configure: (options) ->
#    for o of options
#      @options[o] = options[o]  if options.hasOwnProperty(o) and @options.hasOwnProperty(o)
#    this
#
#
#  #
#  #     * Add functions to the Discuss prototype for each HTTP method.
#  #     
#  setupMethodHandlers: ->
#    for i of @methods
#      ((instance, method) ->
#        instance[method.name] = (path) ->
#          new Request(instance, method, path)
#
#        return
#      ) this, @methods[i]
#    return
#
#  send: (request) ->
#    throw new Error("Invalid send parameters")  if not request or (request not instanceof Request) or not request.onSuccess
#    url = @basepath
#    url = ""  unless url
#    url = Utilities.joinPaths(@basepath, request.path)  if request.path
#    url = url + Utilities.buildQueryString(request._query)  if request._query
#    xhr = Utilities.buildXHR(@options.cors, @options.corsWithCredentials)
#    xhr.open request.method.name, url, true
#    headers = Utilities.buildHeaders(@reqHeaders, request.reqHeaders, typeof request._body, @options.charset)
#    for header of headers
#      xhr.setRequestHeader header, headers[header]  if headers.hasOwnProperty(header)
#    timer = setTimeout(->
#      xhr.abort()
#      request.onError "A network timeout has occurred", 0  if request.onError
#      return
#    , @options.timeout)
#    self = this
#    xhr.onerror = ->
#      clearTimeout timer
#      request.onError "A network-level exception has occurred", 0  if request.onError
#      return
#
#    xhr.onreadystatechange = ->
#      clearTimeout timer
#      if xhr.readyState is 4
#        responseHeaders = Utilities.parseResponseHeaders(xhr.getAllResponseHeaders(), self.options.autoParse)
#        responseBody = Utilities.parseResponseBody(xhr.responseText, responseHeaders, self.options.autoParse)
#        callback = (if (xhr.status >= 100 and xhr.status < 300 or xhr.status is 304) then request.onSuccess else request.onError)
#        callback responseBody, xhr.status, responseHeaders  if callback and xhr.status isnt 0
#      return
#
#    try
#      if request._body and typeof request._body is "object"
#        xhr.send JSON.stringify(request._body)
#      else if request._body and typeof request._body is "string"
#        xhr.send request._body
#      else
#        xhr.send()
#    catch error
#      request.onError error, 0  if request.onError
#    return
#
