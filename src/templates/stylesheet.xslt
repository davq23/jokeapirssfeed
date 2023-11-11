<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet  version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" encoding="utf-8" omit-xml-declaration="yes" />
    <xsl:template name="string-replace-all">
        <xsl:param name="text" />
        <xsl:param name="replace" />
        <xsl:param name="by" />
        <xsl:choose>
            <xsl:when test="$text = '' or $replace = ''or not($replace)" >
                <!-- Prevent this routine from hanging -->
                <xsl:value-of select="$text" />
            </xsl:when>
            <xsl:when test="contains($text, $replace)">
                <xsl:value-of select="substring-before($text,$replace)" />
                <xsl:value-of select="$by" />
                <xsl:call-template name="string-replace-all">
                    <xsl:with-param name="text" select="substring-after($text,$replace)" />
                    <xsl:with-param name="replace" select="$replace" />
                    <xsl:with-param name="by" select="$by" />
                </xsl:call-template>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$text" />
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <xsl:template  match="/">
        <xsl:variable name="lineBreak">
            <br />
        </xsl:variable>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>
                    <xsl:text>JOKE RSS</xsl:text>
                </title>
                <link>
                    <xsl:value-of select="response/link" />
                </link>
                <atom:link href="{response/link}" rel="self" type="application/rss+xml" />
                <description>RSS channel of jokes</description>
                <xsl:for-each select="/response/data/joke">
                    <xsl:variable name="langSelect" select="substring(@lang,0,3)" />
                    <xsl:variable name="readablelang">
                        <xsl:choose>
                            <xsl:when test="$langSelect='en'">English</xsl:when>
                            <xsl:when test="$langSelect='es'">Spanish</xsl:when>
                            <xsl:when test="$langSelect='fr'">French</xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="$langSelect" />
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:variable>
                    <xsl:variable name="readableDescription">
                        <xsl:call-template name="string-replace-all">
                            <xsl:with-param name="text" select="text" />
                            <xsl:with-param name="replace" select="'&#13;'" />
                            <xsl:with-param name="by" select="'&lt;br /&gt;'" />
                        </xsl:call-template>
                    </xsl:variable>
                    <item>
                        <guid isPermaLink="false">
                            <xsl:value-of select="@id" />
                        </guid>
                        <title>
                            Another joke by
                            <xsl:value-of select="user/username" /> in
                            <xsl:value-of select="$readablelang" />
                        </title>
                        <author>
                            <xsl:value-of select="user/email" /> (
                            <xsl:value-of select="user/username" />)
                        </author>
                        <description>
                            <xsl:value-of select="$readableDescription" />
                        </description>
                    </item>
                </xsl:for-each>
            </channel>
        </rss>
    </xsl:template>
</xsl:stylesheet>